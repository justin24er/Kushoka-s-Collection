import '../styles/imageViewer.css'

function ImageViewer({
    children,
    className,
    style
}) {
    return (
        <section 
        className={className}
        style={style}>
            {children}
        </section>
    )
}
export default ImageViewer;