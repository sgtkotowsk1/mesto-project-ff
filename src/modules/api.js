const getAllCards = async () => {
  try {
    const request = await fetch(
      "https://nomoreparties.co/v1/wff-cohort-27/cards",
      {
        headers: {
          authorization: "8d14c817-82a5-44b1-9a59-f37cb913199d",
        },
      }
    );
    return handleRequest(request);
  } catch (err) {
    console.error("Ошибка при запросе:", err);
    throw err
  }
};

const getUserInfo = async () => {
  try {
    const request = await fetch(
      "https://nomoreparties.co/v1/wff-cohort-27/users/me",
      {
        headers: {
          authorization: "8d14c817-82a5-44b1-9a59-f37cb913199d",
        },
      }
    );
    return handleRequest(request);
  } catch (err) {
    console.error("Ошибка при запросе:", err);
    throw err
  }
};

const patchUserInfo = async (profileTitle, profileDesсription) => {
  try {
    const request = await fetch(
      "https://nomoreparties.co/v1/wff-cohort-27/users/me",
      {
        method: "PATCH",
        headers: {
          authorization: "8d14c817-82a5-44b1-9a59-f37cb913199d",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: profileTitle,
          about: profileDesсription,
        }),
      }
    );
    return handleRequest(request);
  } catch (err) {
    console.error("Ошибка при обновлении информации о пользователе:", err);
    throw err
  }
};

const postCard = async (name, link) => {
  try {
    const request = await fetch("https://nomoreparties.co/v1/wff-cohort-27/cards",
      {
        method: "POST",
        headers: {
          authorization: "8d14c817-82a5-44b1-9a59-f37cb913199d",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          link: link
        }),
      }
    );

    return handleRequest(request);
  } catch(err) {
    console.error("Ошибка при загрузке карточки:", err);
    throw err;
  }
}

const handleRequest = async (request) => {
  if (request.ok) {
    return await request.json();
  } else {
    const errorMessage = `Ошибка: ${request.status} - ${request.statusText}`
    throw new Error(errorMessage)
  }
};





export { getAllCards, getUserInfo, patchUserInfo, postCard };
