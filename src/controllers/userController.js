import routes from "../routes"
// global
export const getJoin = (req, res) => {
    res.render("join", { pageTitle: "Join" });
};

export const postJoin = (req, res) => {
    const {
        body: { name, email, password, password2 }
    } = req;
    if(password !== password2){
        res.status(400);
        res.render("join", { pageTitle: "Join" });
    } else {
        // To Do: Register User
        // To Do: Log user in
        res.redirect(routes.home);
    }
}

export const getLogin = (req, res) => res.render("login", { pageTitle: "Login" });
export const postLogin = (req, res) => {
    res.redirect(routes.home);
}

export const logout = (req, res) => {
    // To Do: Process Log Out
    res.redirect(routes.home);
}

// users
export const users = (req, res) => res.render("users", { pageTitle: "Users" });
export const userDetail = (req, res) => res.render("userDetail", { pageTitle: "userDetail" });
export const editProfile = (req, res) => res.render("editProfile", { pageTitle: "editProfile" });
export const changePassword = (req, res) => res.render("changePassword", { pageTitle: "changePassword" });