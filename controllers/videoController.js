// global
export const home = (req, res) => res.render("home", {pageTitle : "Home"})

export const search = (req, res) => {

    // const searchingBy = req.query.term와 동일한 코드
    const {query : {term : searchingBy}} = req;
    res.render("search", {pageTitle : "Search", searchingBy});

}
// videos


export const videos =(req, res) => res.render("videos");
export const upload =(req, res) => res.render("upload", {pageTitle : "Upload"});
export const videoDetail =(req, res) => res.render("videoDetail", {pageTitle : "videoDetail"});
export const editVideo =(req, res) => res.render("editVideo", {pageTitle : "editVideo"});
export const deleteVideo =(req, res) => res.render("deleteVideo", {pageTitle : "deleteVideo"});