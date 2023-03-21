import React from 'react';

const reactionEmoji = {
  thumbsUp: '👍', //1
  wow: '😮', //15
  heart: '❤️', //3
  rocket: '🚀', //12
};

const ReactionButtons = ({ reactions }) => {
  // console.log(Object.entries(reactionEmoji)); 0 : ['thumbsUp', '👍'];  1 : ['wow', '😮']

  const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
    return (
      <button
        key={name}
        type="button"
        className="reactionButton"
        style={{
          // width: '50px',
          // height: '50px',
          // border: 'none',
          // borderRadius: '50%',
          // marginTop: '5px',
          width: '55px',
          height: '53px',
          border: '1px solid gray',
          borderRadius: '30px',
          marginTop: '5px',
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
