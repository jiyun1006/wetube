import routes from "../routes";

// global
export const home = (req, res) => {

    res.render("home", { pageTitle: "Home", videos });

}

export const search = (req, res) => {

    // const searchingBy = req.query.term와 동일한 코드
    const {
        query: { term: searchingBy }
    } = req;
    res.render("search", { pageTitle: "Search", searchingBy, videos });

}
// videos

export const getUpload = (req, res) => res.render("upload", { pageTitle: "Upload" });

export const postUpload = (req, res) => {
    const {
        body: {
            file, title, description
        }
    } = req;
    // To Do: Upload and save video
    res.redirect(routes.videoDetail(324395));
};

export const videoDetail = (req, res) => res.render("videoDetail", { pageTitle: "videoDetail" });
export const editVideo = (req, res) => res.render("editVideo", { pageTitle: "editVideo" });
export const deleteVideo = (req, res) => res.render("deleteVideo", { pageTitle: "deleteVideo" });