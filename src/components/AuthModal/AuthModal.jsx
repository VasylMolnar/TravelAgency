import React from 'react';

const AuthModal = ({ isLogIn, setIsLogIn }) => {
  console.log(isLogIn);
  return (
    <div className={isLogIn ? 'backdropAuth' : 'backdropAuth is-hidden'}>
      <div className="authModal">
        <h1>hello</h1>
      </div>
    </div>
  );
};

export default AuthModal;
