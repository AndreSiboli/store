import styles from "@/styles/pages/home/About.module.scss";
import Container from "../../layout/Container";
import { PiCoin, PiMedal, PiTruck } from "react-icons/pi";

export default function About() {
  const stamps = [
    { icon: <PiTruck />, title: "Fast", text: "Delivery" },
    { icon: <PiCoin />, title: "Cheap", text: "Promotions" },
    { icon: <PiMedal />, title: "Quality", text: "Number 1" },
  ];

  return (
    <section className={styles.about}>
      <Container>
        <div className={styles.about_container}>
          <div className={styles.about_title}>
            <h1>The Number 1 Selling Site!</h1>
          </div>
          <div className={styles.about_action}>
            <p>
              Find a variety of products that meet your needs. What are you
              waiting for?
              <br /> Start shopping now!
            </p>
          </div>
          <div className={styles.about_stamps}>
            {stamps.map((stamp) => (
              <div className={styles.stamp} key={stamp.title}>
                {stamp.icon}
                <h3>{stamp.title}</h3>
                <p>{stamp.text}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
