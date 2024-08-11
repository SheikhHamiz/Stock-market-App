import { Link } from "react-router-dom";
import { useAuth } from "../../security/auth";

const Header = ()=> {
    const authContext = useAuth();
    const authenticated = authContext.authenticated;
    const logout = authContext.logout;
    return (
        <header>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand">Stock-Market App</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item active">
                            <Link className="nav-link" to={"/"}>Home <span className="sr-only"></span></Link>
                        </li>
                        <li>
                            <Link className="nav-link" to={"/portfolio"}>Portfolio</Link>
                        </li>
                        <li>
                            {authenticated &&<Link className="nav-link" to={"/"}
                             onClick={()=> logout()}
                            >Logout</Link>}
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    );
}
export default Header;