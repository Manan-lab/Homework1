import React from 'react';
import styles from './footer.module.css'



export default function Footer() {
    return (
        <div className={styles.footer}>
            <div className={styles.links}>

                <div className={styles.link1}>
                    <div className={styles.github}></div>
                    <a href="https://github.com/Manan-lab">Find me on Github</a>
                </div>

                <div className={styles.link2}>
                    <div className={styles.linkedIn}></div>
                    <a href="https://www.linkedin.com/in/manana-matshkalian-97a2"> Find me on LinkedIn</a>
                </div>
                
            </div>
            <div>
                <p>
                    Created by Manana Matshkalian & Bitschool Team
                </p>
            </div>


        </div>
    )
}