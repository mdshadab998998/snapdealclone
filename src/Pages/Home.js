import BannerCarousel from "../Components/Banner"
// import Navbar from "../Components/Navbar"
import Sidebar from "../Components/Sidebar"
import Categories from "./Catehory"
// import TrendingProductsBanner from "../Components/TrendingProduct"

export const Home=()=>{
    return(
        <>
        {/* <Navbar /> */}
        <div className="flex">
        <Sidebar />
        <div>        <BannerCarousel />
</div>
        </div>
        <div>
        {/* <Categories /> */}
        {/* <Products /> */}

        </div>
       
        </>
    )
}