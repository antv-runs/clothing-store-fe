import type { Meta, StoryObj } from "@storybook/react";
import { HomeReviews } from "./index";

const meta = {
  title: "Organisms/HomeReviews",
  component: HomeReviews,
  tags: ["autodocs"],
  argTypes: {
    isLoading: { control: "boolean" },
    isRetrying: { control: "boolean" },
  },
} satisfies Meta<typeof HomeReviews>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isLoading: false,
    reviews: [
      {
        id: "1",
        productId: "p1",
        name: "Sarah M.",
        ratingStar: 5,
        desc: "I'm blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations.",
        isVerified: true,
        createdAt: "2023-01-01T12:00:00Z",
      },
      {
        id: "2",
        productId: "p2",
        name: "Alex K.",
        ratingStar: 5,
        desc: "Finding clothes that align with my personal style used to be a challenge until I discovered Shop.co. The range of options they offer is truly remarkable, catering to a variety of tastes and occasions.",
        isVerified: true,
        createdAt: "2023-02-01T12:00:00Z",
      },
      {
        id: "3",
        productId: "p3",
        name: "Jamie L.",
        ratingStar: 4,
        desc: "As someone who's always on the lookout for unique fashion pieces, I'm thrilled to have stumbled upon Shop.co. The selection of clothes is not only diverse but also on-point with the latest trends.",
        isVerified: false,
        createdAt: "2023-03-01T12:00:00Z",
      },
    ],
  },
};

export const Loading: Story = {
  args: {
    isLoading: true,
    reviews: [],
  },
};
