import React from "react";
import faker from "faker";
import { render, waitFor, screen, act } from "@testing-library/react";
import OfferModal, { buildCarOption } from "../../../src/pages/home/OfferModal";
import api from "../../../src/api";
import * as auth0 from "@auth0/auth0-react";
import { buildCar } from "../../factory/car-factory";
import { buildPost } from "../../factory/post-factory";
import { ICar } from "../../../src/types/car";

describe("OfferModal test suite", () => {
  let mockGetInventory: jest.SpyInstance;
  let mockUseAuth0: jest.SpyInstance;

  // create mock data
  const mockUserId = faker.datatype.uuid();
  const mockDealerUser = {
    sub: mockUserId,
  };
  const mockCarList = [
    buildCar({ dealerId: mockUserId }),
    buildCar({ dealerId: mockUserId }),
    buildCar({ dealerId: mockUserId }),
  ];
  let promise: Promise<ICar[]>;

  beforeEach(() => {
    // mock functions.
    promise = Promise.resolve(mockCarList);
    mockGetInventory = jest
      .spyOn(api.car, "getInventory")
      .mockImplementation(() => {
        return promise;
      });
    mockUseAuth0 = jest.spyOn(auth0, "useAuth0").mockImplementation(() => {
      return { user: mockDealerUser } as any;
    });
  });

  afterEach(() => {
    // reset mock functions.
    mockUseAuth0.mockRestore();
    mockGetInventory.mockRestore();
  });

  test("inventory tab is default", async () => {
    // render OfferModal component and wait for all states are updated.
    const open = true;
    const onClose = jest.fn();
    const post = buildPost({});
    const setToastState = jest.fn();
    act(() => {
      render(
        <OfferModal
          open={open}
          onClose={onClose}
          post={post}
          setToastState={setToastState}
        />
      );
    });
    await waitFor(() => promise);

    // check if the inventory-tab is active by default.
    const tabPanel = screen.queryByTestId("inventory-tab");
    expect(tabPanel).toBeTruthy();
    expect(tabPanel.getAttribute("class")).toEqual("tab-pane active");

    // check if the select input shows up and its options are correct.
    const select = screen.queryByLabelText("Inventory:");
    expect(select).toBeTruthy();
    const optionList = select.childNodes;
    expect(optionList).toHaveLength(mockCarList.length + 1);
    const expectedTextList = [""];
    mockCarList.forEach((car) => {
      expectedTextList.push(buildCarOption(car));
    });
    optionList.forEach((node, index) => {
      expect(node.textContent).toEqual(expectedTextList[index]);
    });

    // check if the textarea shows up.
    const textarea = screen.queryByLabelText(
      "Anything else you want to leave in this offer:"
    );
    expect(textarea).toBeTruthy();
    expect(textarea.tagName.toLowerCase()).toEqual("textarea");
  });
});
