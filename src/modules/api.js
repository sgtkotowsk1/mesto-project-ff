const PATH = "https://nomoreparties.co/v1/wff-cohort-27";
const authorization = "8d14c817-82a5-44b1-9a59-f37cb913199d";

const getAllCards = async () => {
  try {
    const request = await fetch(`${PATH}/cards`, {
      headers: {
        authorization: authorization,
      },
    });
    return handleRequest(request);
  } catch (err) {
    console.error("Ошибка при запросе:", err);
    throw err;
  }
};

const getUserInfo = async () => {
  try {
    const request = await fetch(`${PATH}/users/me`, {
      headers: {
        authorization: authorization,
      },
    });
    return handleRequest(request);
  } catch (err) {
    console.error("Ошибка при запросе:", err);
    throw err;
  }
};

const patchUserInfo = async (profileTitle, profileDesсription) => {
  try {
    const request = await fetch(`${PATH}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: authorization,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: profileTitle,
        about: profileDesсription,
      }),
    });
    return handleRequest(request);
  } catch (err) {
    console.error("Ошибка при обновлении информации о пользователе:", err);
    throw err;
  }
};

const postCard = async (name, link) => {
  try {
    const request = await fetch(`${PATH}/cards`, {
      method: "POST",
      headers: {
        authorization: authorization,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    });

    return handleRequest(request);
  } catch (err) {
    console.error("Ошибка при загрузке карточки:", err);
    throw err;
  }
};

const updateLikeStatus = async (cardId, isLiked) => {
  try {
    const method = isLiked ? "DELETE" : "PUT";
    const response = await fetch(`${PATH}/cards/likes/${cardId}`, {
      method,
      headers: {
        authorization,
        "Content-Type": "application/json",
      },
    });
    return handleRequest(request);
  } catch (err) {
    console.error("Ошибка при обновлении лайка:", err);
    throw err;
  }
};
const handleRequest = async (request) => {
  if (request.ok) {
    return await request.json();
  } else {
    const errorMessage = `Ошибка: ${request.status} - ${request.statusText}`;
    throw new Error(errorMessage);
  }
};

export { getAllCards, getUserInfo, patchUserInfo, postCard, updateLikeStatus };
