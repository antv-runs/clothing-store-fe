import { Text } from "@/components/atoms/Text";
import { Button } from "@/components/atoms/Button";
import "./index.scss";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/routes/paths";
import { UI_TEXT } from "@/const/uiText";

type ProductNotFoundProps = {
  message?: string;
};

export const ProductNotFound = ({
  message = UI_TEXT.PRODUCT_NOT_FOUND,
}: ProductNotFoundProps) => {
  const navigate = useNavigate();

  const handleBackHome = () => {
    navigate(ROUTES.HOME);
  };

  return (
    <div className="container u-mt-25">
      <section
        className="product-overview product-not-found"
        aria-label="Product overview"
      >
        <Text as="p" className="product-overview__description">
          {message}
        </Text>

        <Button
          variant="primary"
          className="product-not-found__action"
          onClick={handleBackHome}
        >
          {UI_TEXT.BACK_TO_HOME}
        </Button>
      </section>
    </div>
  );
};
