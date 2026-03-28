import IconButton from "../../atoms/IconButton/IconButton";
import { Text, TextLink } from "../../atoms";
import "./AnnouncementBar.scss";

export const AnnouncementBar: React.FC = () => {
  return (
    <div className="announcement-bar">
      <div className="announcement-bar__container">
        <Text as="p" className="announcement-bar__text">
          Sign up and get 20% off to your first order.{" "}
          <TextLink href="#" className="announcement-bar__link">
            Sign Up Now
          </TextLink>
        </Text>

        <IconButton
          svgName="icn_close"
          className="announcement-bar__close"
          ariaLabel="Close announcement"
          iconWidth={14}
          iconHeight={14}
        />
      </div>
    </div>
  );
};
