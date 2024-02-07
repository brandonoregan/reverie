import React from "react";
import { Card, Image, Button, Container } from "react-bootstrap";
import styles from "./CategoryCard.module.css"; // Import the CSS module
import { LinkContainer } from "react-router-bootstrap";

function CategoryCard({ cat }) {
  return (
    <LinkContainer to={`products/${cat.category}`}>
      <Card className={styles.categoryCard}>
        <Image
          className={styles.categoryImage}
          src={cat.image}
          alt={cat.category}
        />
        <div className={styles.banner}>
          <Container>
            <p className={styles.shopNowBtn}>
              {cat.category.charAt(0).toUpperCase() + cat.category.slice(1)}
            </p>
            <Button className={styles.viewMoreBtn} variant="dark">
              View More
            </Button>
          </Container>
        </div>
      </Card>
    </LinkContainer>
  );
}

export default CategoryCard;
