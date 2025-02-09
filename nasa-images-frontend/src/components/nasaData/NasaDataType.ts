
export type postType = {
    id: number;
    sol: number;
    img_src: string;
    earth_date: string;
    camera: cameraType;
    rover: roverType;
}

export type listPostType = {
    post: postType[]
}

export type cameraType = {
        name: string,
        full_name: string
}

export type roverType = {
    name: string;
    landing_date: string;
    launch_date: string;
    status: string;
}
