import React, { useState, useEffect, Fragment } from "react";
import {
  Button,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Nav,
  NavItem,
  NavLink,
  Row,
  Spinner,
  TabContent,
  TabPane,
} from "reactstrap";
import classnames from "classnames";
import _ from "lodash";
import { useAuth0 } from "@auth0/auth0-react";
import { IPost } from "src/types/post";
import { ICar } from "src/types/car";
import api from "src/api";
import { carMakeList, carModelObject } from "src/api/mock";
import { IOffer } from "src/types/offer";
import { ToastState } from "src/commons/Toast";

type Props = {
  open: boolean;
  onClose: (update: boolean) => void;
  post: IPost;
  setToastState: (toastState: ToastState) => void;
};

const OfferModal = ({ open, onClose, post, setToastState }: Props) => {
  const { user } = useAuth0();
  const [loadingInventory, setLoadingInventory] = useState<boolean>(false);
  const [inventory, setInventory] = useState<ICar[]>([]);
  const [newCar, setNewCar] = useState<ICar>({} as ICar);
  const [newOffer, setNewOffer] = useState<IOffer>({} as IOffer);
  const [selectedTab, setSelectedTab] = useState<number>(0);
  const [saving, setSaving] = useState<boolean>(false);

  useEffect(() => {
    if (open) {
      const dealerId = _.get(user, "sub", "");
      setNewOffer({
        ...newOffer,
        dealerId,
        postId: post._id,
        status: "PENDING",
      });
      setNewCar({ ...newCar, dealerId });
      setLoadingInventory(true);
      loadDealerCars(dealerId).then(() => {
        setLoadingInventory(false);
      });
    }
  }, [open]);

  const handleModalOnClose = (update: boolean) => {
    setSelectedTab(0);
    setNewCar({} as ICar);
    setNewOffer({} as IOffer);
    onClose(update);
  };

  const handleCreateButtonOnClick = () => {
    setSaving(true);
    if (selectedTab === 1) {
      api.car
        .create(newCar)
        .then((car) => {
          const offerCopy = _.cloneDeep(newOffer);
          offerCopy.carId = car._id;
          return api.offer.create(offerCopy).then(() => {
            setToastState({
              open: true,
              severity: "success",
              message: "The new offer is created.",
            });
            handleModalOnClose(true);
          });
        })
        .catch((reason) => {
          setToastState({
            open: true,
            severity: "danger",
            message: `Creating the new offer failed: ${String(reason)}`,
          });
        })
        .finally(() => {
          setSaving(false);
        });
    } else {
      api.offer
        .create(newOffer)
        .then(() => {
          setToastState({
            open: true,
            severity: "success",
            message: "The new offer is created.",
          });
          handleModalOnClose(true);
        })
        .catch((reason) => {
          setToastState({
            open: true,
            severity: "danger",
            message: `Creating the new offer failed: ${String(reason)}`,
          });
        })
        .finally(() => {
          setSaving(false);
        });
    }
  };

  const loadDealerCars = (dealerId: string) => {
    return api.car.getInventory(dealerId).then((carList) => {
      setInventory(carList);
    });
  };

  const buildCarOption = (car: ICar) => {
    return `${car.year} ${car.carMake} ${car.carModel}, ${car.mileage} miles, $${car.price}`;
  };

  const renderAddtionalInformationInput = () => {
    return (
      <FormGroup row>
        <Col sm='12'>
          <Label for='offer-modal-addtional-information'>
            Anything else you want to leave in this offer:
          </Label>
          <Input
            id='offer-modal-addtional-information'
            name='additionalInformation'
            onChange={(event) => {
              setNewOffer({
                ...newOffer,
                additionalMessage: event.target.value,
              });
            }}
            style={{ minHeight: "150px" }}
            type='textarea'
            value={_.get(newOffer, "additionalMessage", "")}
          />
        </Col>
      </FormGroup>
    );
  };

  const renderCarModelOptions = () => {
    const carMake = _.get(newCar, "carMake");
    if (!carMake) {
      return null;
    } else {
      const modelList = _.get(carModelObject, carMake, new Array<string>(0));
      return (
        <Fragment>
          <option value=''></option>
          {modelList.map((model) => (
            <option key={model}>{model}</option>
          ))}
        </Fragment>
      );
    }
  };

  const renderInventoryTab = () => {
    return (
      <Form>
        <FormGroup row>
          <Col sm='12'>
            {loadingInventory ? (
              <Spinner color='info' size='lg' />
            ) : (
              <Fragment>
                <Label for='offer-modal-select-car'>Inventory:</Label>
                <Input
                  id='offer-modal-select-car'
                  type='select'
                  name='selectedCar'
                  onChange={(event) => {
                    setNewOffer({
                      ...newOffer,
                      carId: event.target.value,
                    });
                  }}
                  value={_.get(newOffer, "carId", "")}
                >
                  <option value=''></option>
                  {inventory.map((car) => (
                    <option key={car._id} value={car._id}>
                      {buildCarOption(car)}
                    </option>
                  ))}
                </Input>
              </Fragment>
            )}
          </Col>
        </FormGroup>
        {renderAddtionalInformationInput()}
      </Form>
    );
  };

  const renderNewCarTab = () => {
    return (
      <Form>
        <FormGroup row>
          <Col sm={4}>
            <Label for='offer-modal-vin'>Vin</Label>
            <Input
              id='offer-modal-vin'
              name='vin'
              onChange={(event) => {
                setNewCar({ ...newCar, vin: event.target.value });
              }}
              type='text'
              value={_.get(newCar, "vin", "")}
            />
          </Col>
          <Col sm={4}>
            {/* Make */}
            <Label for='offer-modal-car-make'>Make</Label>
            <Input
              id='offer-modal-car-make'
              name='carMake'
              onChange={(event) => {
                setNewCar({
                  ...newCar,
                  carMake: event.target.value,
                  carModel: "",
                });
              }}
              type='select'
              value={_.get(newCar, "carMake", "")}
            >
              <option value=''></option>
              {carMakeList.map((make) => (
                <option key={make}>{make}</option>
              ))}
            </Input>
          </Col>
          <Col sm={4}>
            {/* Model */}
            <Label for='car-model'>Model</Label>
            <Input
              disabled={!_.get(newCar, "carMake")}
              id='car-model'
              name='carModel'
              onChange={(event) =>
                setNewCar({ ...newCar, carModel: event.target.value })
              }
              type='select'
              value={_.get(newCar, "carModel", "")}
            >
              {renderCarModelOptions()}
            </Input>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Col sm={4}>
            <Label for='offer-modal-year'>Year</Label>
            <Input
              id='offer-modal-year'
              name='year'
              onChange={(event) => {
                setNewCar({ ...newCar, year: event.target.value });
              }}
              type='text'
              value={_.get(newCar, "year", "")}
            />
          </Col>
          <Col sm={4}>
            <Label for='offer-modal-mileage'>Mileage</Label>
            <Input
              id='offer-modal-mileage'
              name='mileage'
              onChange={(event) => {
                setNewCar({ ...newCar, mileage: event.target.valueAsNumber });
              }}
              type='number'
              value={_.get(newCar, "mileage", 0)}
            />
          </Col>
          <Col sm={4}>
            <Label for='offer-modal-price'>Price</Label>
            <Input
              id='offer-modal-price'
              name='price'
              onChange={(event) => {
                setNewCar({ ...newCar, price: event.target.valueAsNumber });
              }}
              type='number'
              value={_.get(newCar, "price", 0)}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Col sm={4}>
            <Label for='offer-modal-trim'>Trim</Label>
            <Input
              id='offer-modal-trim'
              name='trim'
              onChange={(event) => {
                setNewCar({ ...newCar, trim: event.target.value });
              }}
              type='text'
              value={_.get(newCar, "trim", "")}
            />
          </Col>
          <Col sm={4}>
            <Label for='offer-modal-color'>Color</Label>
            <Input
              id='offer-modal-color'
              name='color'
              onChange={(event) => {
                setNewCar({ ...newCar, color: event.target.value });
              }}
              type='text'
              value={_.get(newCar, "color", "")}
            />
          </Col>
        </FormGroup>
        {renderAddtionalInformationInput()}
      </Form>
    );
  };

  return (
    <Modal
      centered
      isOpen={open}
      size={"xl"}
      toggle={() => {
        console.log("toggle");
        handleModalOnClose(false);
      }}
    >
      <ModalHeader>Create a Offer</ModalHeader>
      <ModalBody>
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: selectedTab === 0 })}
              onClick={() => {
                setSelectedTab(0);
              }}
            >
              With Inventory
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: selectedTab === 1 })}
              onClick={() => {
                setSelectedTab(1);
              }}
            >
              With New Cars
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={selectedTab}>
          <TabPane tabId={0}>{renderInventoryTab()}</TabPane>
          <TabPane tabId={1}>{renderNewCarTab()}</TabPane>
        </TabContent>
      </ModalBody>
      <ModalFooter>
        <Button color='primary' onClick={handleCreateButtonOnClick}>
          Create
        </Button>
        <Button
          color='danger'
          outline
          onClick={() => handleModalOnClose(false)}
        >
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default OfferModal;
