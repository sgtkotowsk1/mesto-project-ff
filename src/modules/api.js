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
  }
};

const patchUserInfo = async (profileTitle, profileDesription) => {
  try {
    const request = await fetch(
      "https://nomoreparties.co/v1/wff-cohort-27/users/me",
      {
        method: "PATCH",
        headers: {
          authorization: "c56e30dc-2883-4270-a59e-b2f7bae969c6",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: profileTitle,
          about: profileDesription,
        }),
      }
    );
    return handleRequest(request);
  } catch (err) {
    console.error("Ошибка при обновлении информации пользователя:", err);
  }
};

const handleRequest = (request) => {
  if (request.ok) {
    return request.json();
  }
};

export { getAllCards, getUserInfo, patchUserInfo };
