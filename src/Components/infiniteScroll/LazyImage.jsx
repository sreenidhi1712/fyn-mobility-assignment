/* eslint-disable react/prop-types */

const LazyImage = (props) => {
    return (
        <img  {...props} className={`${props.className ?? "lazy-loaded-image lazy"} `} src="placeholder.jpg" data-src={props.src} />
    )
}

export default LazyImage