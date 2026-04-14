import { Heading } from "@/components/atoms/Heading";
import { Text } from "@/components/atoms/Text";
import { RatingDisplay } from "@/components/molecules/RatingDisplay";
import { ProductPrice } from "@/components/molecules/ProductPrice";
import type { Product } from "@/types/product";
import "./index.scss";

type ProductInfoProps = {
  product: Product;
};

export const ProductInfo = ({ product }: ProductInfoProps) => {
  return (
    <>
      <Heading as="h1" noOfLines={2}>
        {product.name}
      </Heading>

      <RatingDisplay rating={product.rating} showEmpty={false} />

      <ProductPrice pricing={product.pricing} />

      <Text as="p" className="product-info__description">
        {product.description}
      </Text>
    </>
  );
};
