import error from "../images/404_page_cover.jpg"
function NotFound() {
    return (
        <div 
            style={{
                backgroundImage: `url(${error})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                width: "100vw",
                height: "100vh",
            }}
        >
        </div>
    )
}

export default NotFound;
