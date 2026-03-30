import { Button } from "@/components/atoms/Button";
import { Text } from "@/components/atoms/Text";
import { InputWithIcon } from "@/components/molecules/InputWithIcon";

export const FooterForm = () => {
  return (
    <div className="footer-form">
      <Text as="p">STAY UPTO DATE ABOUT OUR LATEST OFFERS</Text>
      <form action="#">
        <InputWithIcon
          iconName="icn_mail"
          placeholder="Enter your email address"
          type="email"
          ariaLabel="Email address"
          className="footer-form__input"
        />
        <Button className="footer-form__button" type="button" unstyled>
          Subscribe to Newsletter
        </Button>
      </form>
    </div>
  );
};
