import React from 'react';
import { useUpdateImgMutation } from '../../features/gallery/galleryApiSlice';
import { Loading, Report } from 'notiflix';

const reactionEmoji = {
  thumbsUp: '👍', //1
  wow: '😮', //15
  heart: '❤️', //3
  rocket: '🚀', //12
};

const ReactionButtons = ({ reactions, currentImgID, userID }) => {
  // console.log(Object.entries(reactionEmoji)); 0 : ['thumbsUp', '👍'];  1 : ['wow', '😮']

  //fn API
  const [updateIMG] = useUpdateImgMutation();

  //all AUTH User
  const handleAddReactions = async (newReactions, userID, currentImgID) => {
    Loading.pulse('Оновлення зображення ... ');

    await updateIMG({ userID, currentImgID, newReactions })
      .then(data => {
        Loading.remove();
      })
      .catch(error => {
        Loading.remove();
        Report.failure(error || 'Помилка оновлення', '');
      });
  };

  const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
    return (
      <button
        key={name}
        type="button"
        className="reactionButton"
        style={{
          width: '55px',
          height: '53px',
          border: '1px solid gray',
          borderRadius: '30px',
          marginTop: '5px',
        }}
        onClick={e => {
          handleAddReactions(
            { ...reactions, [name]: reactions[name] + 1 },
            userID,
            currentImgID
          );
        }}
      >
        {emoji}
        {reactions[name]}
      </button>
    );
  });

  // const reactionButtons = [];

  // for (let key in reactionEmoji) {
  //   reactionButtons.push(
  //     <button
  //       key={key}
  //       type="button"
  //       className="reactionButton"
  //       style={{
  //         width: '60px',
  //         height: '50x',
  //         border: '1px solid gray',
  //         borderRadius: '30px',
  //         marginTop: '5px',
  //       }}
  //     >
  //       {reactionEmoji[key]}//value
  //       {reactions[key]}//value
  //     </button>
  //   );
  // }

  // console.log(reactionButtons);
  return <div className="reactionButtons">{reactionButtons}</div>;
};

export default ReactionButtons;
