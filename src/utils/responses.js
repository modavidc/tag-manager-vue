export const parseErrors = (res) => {
  if (res.status === 422) {
    return parseValidationErrors(res.data.errors);
  }

  return res.message;
};

const parseValidationErrors = (errors) => {
  let messages = [];

  for (const key in errors) {
    const fields = errors[key];

    fields.forEach((error) => {
      messages += `<p>${error}</p>`;
    });
  }

  return messages;
};
