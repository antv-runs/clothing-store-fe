import { useNavigate } from "react-router-dom";
import { Heading } from "@/components/atoms/Heading";
import { Button } from "@/components/atoms/Button";
import { Icon } from "@/components/atoms/Icon";
import { ROUTES } from "@/routes/paths";
import { UI_TEXT } from "@/const/uiText";
import "./index.scss";

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate(ROUTES.HOME);
  };

  return (
    <div className="container u-mt-25">
      <div className="not-found-page">
        <div className="not-found-page__content">
          <Heading as="h1" className="not-found-page__code" aria-label="404">
            <span className="not-found-page__digit">4</span>
            <span className="not-found-page__zero-wrap">
              <span className="not-found-page__zero">0</span>
              <span
                className="not-found-page__sparkle not-found-page__sparkle--left"
                aria-hidden="true"
              >
                <Icon
                  svgName="icn_glitter"
                  height="100%"
                  width="100%"
                  color="#000"
                />
              </span>
              <span
                className="not-found-page__sparkle not-found-page__sparkle--right"
                aria-hidden="true"
              >
                <Icon
                  svgName="icn_glitter"
                  height="100%"
                  width="100%"
                  color="#000"
                />
              </span>
            </span>
            <span className="not-found-page__digit">4</span>
          </Heading>

          <p className="not-found-page__message">Page not found</p>

          <Button
            className="not-found-page__action"
            type="button"
            variant="primary"
            onClick={handleGoHome}
          >
            {UI_TEXT.GO_BACK_TO_HOME}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
