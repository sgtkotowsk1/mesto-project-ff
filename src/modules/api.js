const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-27",
  headers: {
    authorization: "8d14c817-82a5-44b1-9a59-f37cb913199d",
    "Content-Type": "application/json",
  },
};

const getAllCards = async () => {
  try {
    const request = await fetch(`${config.baseUrl}/cards`, {
      headers: config.headers,
    });
    return handleRequest(request);
  } catch (err) {
    console.error("Ошибка при запросе:", err);
    throw err;
  }
};

const getUserInfo = async () => {
  try {
    const request = await fetch(`${config.baseUrl}/users/me`, {
      headers: config.headers,
    });
    return handleRequest(request);
  } catch (err) {
    console.error("Ошибка при запросе:", err);
    throw err;
  }
};

const updateUserInfo = async (profileTitle, profileDesсription) => {
  try {
    const request = await fetch(`${config.baseUrl}/users/me`, {
      method: "PATCH",
      headers: config.headers,
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
    const request = await fetch(`${config.baseUrl}/cards`, {
      method: "POST",
      headers: config.headers,
      body: JSON.stringify({
        name,
        link,
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
    const request = await fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
      method,
      headers: config.headers,
    });
    return handleRequest(request);
  } catch (err) {
    console.error("Ошибка при обновлении лайка:", err);
    throw err;
  }
};

const deleteCard = async (cardId) => {
  try {
    const request = await fetch(`${config.baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: config.headers,
    });
    return handleRequest(request);
  } catch (err) {
    console.err("Не удалось удалить карточку", err);
    throw err;
  }
};

const updateUserAvatar = async (avatar) => {
  try {
    const request = await fetch(`${config.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: config.headers,
      body: JSON.stringify({
        avatar,
      }),
    });
    return handleRequest(request);
  } catch (err) {
    console.err("Не удалось загрузить аватар", err);
    throw err;
  }
};

const checkImageValidity = async (link) => {
  try {
    const request = await fetch(`${link}`, {
      method: "HEAD",
    });
    if (request.ok) {
      const contentType = request.headers.get("Content-Type");
      if (contentType && contentType.startsWith("image/")) {
        return true;
      }
      return false;
    }
    return false;
  } catch (err) {
    console.error("По указанному URL не найдено изображение", err);
    return false;
  }
};

const handleRequest = async (request) => {
  if (!request.ok) {
    const errorMessage = `Запрос завершен с ошибкой : ${request.status}: ${request.statusText}`;
    throw new Error(errorMessage);
  }
  try {
    return await request.json();
  } catch (err) {
    throw new Error("Ошибка при получении ответа");
  }
};

export {
  getAllCards,
  getUserInfo,
  updateUserInfo,
  postCard,
  updateLikeStatus,
  deleteCard,
  updateUserAvatar,
  checkImageValidity,
};
