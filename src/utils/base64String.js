export const uint8ArrayToBase64 = uint8Array => {
  const old = uint8Array;
  const newARR = btoa(
    new Uint8Array(uint8Array).reduce(
      (data, byte) => data + String.fromCharCode(byte),
      ''
    )
  );

  return {
    ...old,
  };
};
