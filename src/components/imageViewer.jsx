import '../styles/imageViewer.css'

function ImageViewer({
    children
}) {
    return (
        <section className="image-viewer">
            {children}
        </section>
    )
}
export default ImageViewer;