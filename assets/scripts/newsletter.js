const form = document.getElementById("newsletter");
const emailField = document.getElementById("email");

form.onsubmit = async (e) => {
    e.preventDefault();
    await axios
        .post("/sign-up", {
            email: emailField.value,
        })
        .then(() => {
            new Notify({
                title: "Yay!",
                text: "successfully signed up for the newsletter :)",
            });
        })
        .catch(() => {
            new Notify({
                title: "Error!",
                text: "error, user is already registered :P",
            });
        });
};
