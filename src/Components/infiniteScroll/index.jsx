import { useCallback, useEffect, useRef, useState } from "react"
import "./infiniteScroll.css"
import LazyImage from "./LazyImage"



const clientId = 'N8WKkGErYIt96bt9Jm9gtyB5ZiUmArkkMScbE1W6AFU'
const fetchImages = async (page = 0) => {

    try {
        const res = await fetch(`https://api.unsplash.com/photos?client_id=${clientId}&page=${page}&per_page=10`)
        const data = await res.json()
        let counter=Date.now()
        return data ?  data.map(e=> ({...e, id: `${e.id}__${counter++}` })) : []

    } catch (error) {
        throw new Error(error)
    }
}






const InfiniteScroll = () => {

    const [data, setData] = useState([])
    const page = useRef(0)
    const [loading, setLoading] = useState(false)
    const [hasMore, setHasMore] = useState(true)



    const fetchImageData = useCallback(async (reset = true) => {
        try {
            page.current = page.current + 1
            if (reset) {
                page.current = 0;
                setData([])
                setHasMore(true)
            }
            setLoading(true)
            const res = await fetchImages(page.current);
            setData(prev => [...prev, ...res])
            if (res.length < 5) {
                setHasMore(false)
            }

        } catch (error) {
            setHasMore(false)
        } finally {
            setLoading(false)
        }
    }, [])



    useEffect(() => {
        fetchImageData()
        return () => {

        }
    }, [fetchImageData])




    // For infinite scrolling
    useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                fetchImageData(false)
            }
        })
        if (!data.length || !hasMore || loading) {
            return
        }

        const lastImage = document.querySelector(".gallery-image:last-child")
        if (lastImage) {
            observer.observe(lastImage)
        }

        return () => {
            observer.disconnect()
        }
    }, [data.length, fetchImageData, hasMore, loading])


    useEffect(() => {



        const lazyImageObserver = new IntersectionObserver(function (entries, observer) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    let lazyImage = entry.target;
                    lazyImage.src = lazyImage.dataset.src;
                    lazyImage.classList.remove("lazy");
                    observer.unobserve(lazyImage);
                }
            });
        });
        if (!data.length) {
            return
        }

        const lazyImages = document.querySelectorAll(".lazy-loaded-image.lazy")
        lazyImages.forEach(function (lazyImage) {
            lazyImageObserver.observe(lazyImage);
        });
        return () => {
            lazyImageObserver.disconnect()
        }
    }, [data.length])




    return (
        <div className="scroll-wrapper">
            {
                data.map(item => <div key={item.id} className="gallery-image">
                    <LazyImage src={item?.urls?.thumb} alt={item.alt_description} />
                </div>)
            }
        </div>
    )
}


export default InfiniteScroll