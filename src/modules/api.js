const getAllCards = async () => {
  try {
        const request = await fetch("https://nomoreparties.co/v1/wff-cohort-27/cards", {
            headers: {
                authorization: "8d14c817-82a5-44b1-9a59-f37cb913199d",
            },
        });
        return handleRequest(request);
    } catch (err) {
        console.error("Ошибка при запросе:", err);
    }
};


const getUserInfo = async () => {
    try {
        const request = await fetch('https://nomoreparties.co/v1/wff-cohort-27/users/me', {
            headers: {
                authorization: "8d14c817-82a5-44b1-9a59-f37cb913199d",
            },
        });
        return handleRequest(request);
    } catch(err) {
        console.error("Ошибка при запросе:", err)
    }
}

const handleRequest = (request) => {
    if (request.ok) {
      return request.json();
    }
  };

export { getAllCards, getUserInfo };
