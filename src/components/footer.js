import react, { Component } from "react"
import styles from "../style.module.css"
export default class Footer extends Component {
    render(){
        return (
            <footer className={styles.mainFooter}>
                <div className="container">
                    <div className="copyright text-center my-auto" style={{color: "white", paddingTop: "3vh"}}>
                    <span>Copyright &copy; EVAX 2021</span>
                    </div>
                </div>
            </footer>
        )
    }
}
