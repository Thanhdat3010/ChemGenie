import Navbar from "../components/Navbar";
import Blog from "../Blog/Blog";
import Footer from "../components/Footer";
import { Layout } from "antd";
function Tainguyen(){
    return(
        <Layout>
        <Navbar/>
        <div className="block contactBlock">
        <div className="block">
        <Blog/>
        </div>
        </div>
        <Footer/>
        </Layout>
    )
}
export default Tainguyen;