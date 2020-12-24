import routes from "../routes";
import Video from "../models/Video";


// global
export const home = async (req, res) => {
    try {
        const videos = await Video.find({});
        console.log(videos);
        res.render("home", { pageTitle: "Home", videos });
    } catch (error) {
        console.log(error)
        res.render("home", { pageTitle: "Home", videos });

    }
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

export const postUpload = async(req, res) => {
    const { 
        body: {title, description },
        file: { path }

    } = req;
    const newVideo = await Video.create({
        fileUrl : path,
        title,
        description
    })

    // To Do: Upload and save video
    res.redirect(routes.videoDetail(newVideo.id));
};

export const videoDetail = (req, res) => res.render("videoDetail", { pageTitle: "videoDetail" });
export const editVideo = (req, res) => res.render("editVideo", { pageTitle: "editVideo" });
export const deleteVideo = (req, res) => res.render("deleteVideo", { pageTitle: "deleteVideo" });