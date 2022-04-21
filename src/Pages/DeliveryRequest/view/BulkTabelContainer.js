import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useState } from "react";
import { useEffect } from "react";
import MenuComp from "../../../common/Components/MenuComp";
import PrimaryButton from "../../../common/Components/Button/PrimaryButton";
import SecondaryButton from "../../../common/Components/Button/SecondaryButton";
import {
  useDeletesaveasdraftbyidMutation,
  useGetsaveasdraftQuery,
  useOnConfirmDeliveyMutation,
  usePatchEnteredValueMutation,
  useSaveasdraftMutation,
} from "../../../Redux/Services/FetchApi";

const useStyles = makeStyles({
  table: {},
});

export default function BulkTabelContainer() {
  function createData(
    sn,
    ProductName,
    ProductDetails,
    PackageValue,
    COD,
    Deleveredto,
    PhoneNumber,
    Email,
    Address,
    Edit
  ) {
    return {
      sn,
      ProductName,
      ProductDetails,
      PackageValue,
      COD,
      Deleveredto,
      PhoneNumber,
      Email,
      Address,
      Edit,
    };
  }

  const [patchEnteredvalueMutation, patchEnteredvalueMutationResponseInfo] =
    usePatchEnteredValueMutation();

  const [clickValue, setClickValue] = useState();

  const [bulktabeldata, setbulktabeldata] = useState([]);

  const getsaveasdraft = useGetsaveasdraftQuery();

  const [postsaveasdraft, postsaveasdraftResponseInfo] =
    useSaveasdraftMutation();

  const [removesaveasdraftbyid, removesaveasdraftbyidResponseInfo] =
    useDeletesaveasdraftbyidMutation();

  const onClickToRemove = () => {
    removesaveasdraftbyid(clickValue);
  };

  const [onConfirmDelivery, onConfirmDeliveryResponseInfo] =
    useOnConfirmDeliveyMutation();
  useEffect(() => {
    if (removesaveasdraftbyidResponseInfo.isSuccess) {
      getsaveasdraft.refetch();
    }
  }, [removesaveasdraftbyidResponseInfo.isSuccess]);

  const onClicktoAddmore = () => {
    postsaveasdraft();
  };
  useEffect(() => {
    if (postsaveasdraftResponseInfo.isSuccess) {
      getsaveasdraft.refetch();
    }
  }, [postsaveasdraftResponseInfo.isSuccess]);

  useEffect(() => {
    if (removesaveasdraftbyidResponseInfo.isSuccess) {
      getsaveasdraft.refetch();
    }
  }, [removesaveasdraftbyidResponseInfo.isSuccess]);

  useEffect(() => {
    if (patchEnteredvalueMutationResponseInfo.isSuccess) {
      getsaveasdraft.refetch();
    }
  }, [patchEnteredvalueMutationResponseInfo.isSuccess]);

  useEffect(() => {
    if (getsaveasdraft.data) {
      setbulktabeldata(getsaveasdraft?.data);
    }
  }, [getsaveasdraft.data]);
  useEffect(() => {
    if (onConfirmDeliveryResponseInfo.isSuccess) {
      getsaveasdraft.refetch();
    }
  }, [onConfirmDeliveryResponseInfo.isSuccess]);

  const sendEnteredDataProductName = (id, value) => {
    const enteredvaluecontainer = {
      id: id,
      data: {
        productname: value,
      },
    };
    patchEnteredvalueMutation(enteredvaluecontainer);
  };
  const sendEnteredDataproductdetails = (id, value) => {
    const enteredvaluecontainer = {
      id: id,
      data: {
        packagedetail: value,
      },
    };
    patchEnteredvalueMutation(enteredvaluecontainer);
  };
  const sendEnteredDatapackagevalue = (id, value) => {
    const enteredvaluecontainer = {
      id: id,
      data: {
        packagevalue: value,
      },
    };
    patchEnteredvalueMutation(enteredvaluecontainer);
  };
  const sendEnteredDatacod = (id, value) => {
    const enteredvaluecontainer = {
      id: id,
      data: {
        cod: value,
      },
    };
    patchEnteredvalueMutation(enteredvaluecontainer);
  };
  const sendEnteredDataphone = (id, value) => {
    const enteredvaluecontainer = {
      id: id,
      data: {
        phone: value,
      },
    };
    patchEnteredvalueMutation(enteredvaluecontainer);
  };

  const sendEnteredDataemail = (id, value) => {
    const enteredvaluecontainer = {
      id: id,
      data: {
        email: value,
      },
    };
    patchEnteredvalueMutation(enteredvaluecontainer);
  };
  const sendEnteredDatadeliveryto = (id, value) => {
    const enteredvaluecontainer = {
      id: id,
      data: {
        deliveryto: value,
      },
    };
    patchEnteredvalueMutation(enteredvaluecontainer);
  };
  const sendEnteredDatadeliverylocation = (id, value) => {
    const enteredvaluecontainer = {
      id: id,
      data: {
        deliverylocation: value,
      },
    };
    patchEnteredvalueMutation(enteredvaluecontainer);
  };

  const sendDataOnConfirmDelivery = (id) => {
    const storeidArray = [id];
    onConfirmDelivery({
      idsofdraft: storeidArray,
    });
  };
  const sendDataOnConfirmAllDelivery = () => {
    const arrayOfIds = [];
    const filteringId = bulktabeldata.map((value) => arrayOfIds.push(value.id));
    onConfirmDelivery({
      idsofdraft: arrayOfIds,
    });
  };

  const classes = useStyles();

  const changeValueofanbulkdata = (id, value, key) => {
    const copyofbulktabeldata = bulktabeldata;
    const updatedValue = copyofbulktabeldata?.map((data) => {
      if (data.id === id) {
        return {
          ...data,
          [key]: value,
        };
      } else {
        return data;
      }
    });
    setbulktabeldata(updatedValue);
  };
  return (
    <>
      <div>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>S.N</TableCell>
                <TableCell align="left">Product Name</TableCell>
                <TableCell width={"300px"} align="left">
                  Product Details
                </TableCell>
                <TableCell width={"300px"} align="left">
                  Package Value
                </TableCell>
                <TableCell align="left">COD</TableCell>
                <TableCell align="left">Delevered to</TableCell>
                <TableCell align="left">Phone Number</TableCell>
                <TableCell align="left">Email</TableCell>
                <TableCell align="left">Address</TableCell>
                <TableCell align="left">Edit</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {bulktabeldata?.map((row, index) => {
                return (
                  <>
                    <TableRow key={row?.id}>
                      <TableCell component="th" scope="row">
                        <div className="bulktabeldata">{++index}</div>
                      </TableCell>
                      <TableCell component="th" scope="row">
                        <div className="bulktabeldata">
                          <input
                            value={row?.productname}
                            onChange={(e) =>
                              changeValueofanbulkdata(
                                row?.id,
                                e.target.value,
                                "productname"
                              )
                            }
                            onBlur={(e) =>
                              sendEnteredDataProductName(row?.id, e.target.value)
                            }
                            type="text"
                            placeholder="ex: Dharan"
                          />
                        </div>
                      </TableCell>
                      <TableCell align="left">
                        <div className="bulktabeldata">
                          <input
                            value={row?.packagedetail}
                            onChange={(e) =>
                              changeValueofanbulkdata(
                                row.id,
                                e.target.value,
                                "packagedetail"
                              )
                            }
                            onBlur={(e) =>
                              sendEnteredDataproductdetails(
                                row?.id,
                                e.target.value
                              )
                            }
                            type="text"
                            placeholder="ex: Dharan"
                          />
                        </div>
                      </TableCell>
                      <TableCell align="left">
                        <div className="bulktabeldata">
                          <input
                            value={row?.packagevalue}
                            type="text"
                            onBlur={(e) =>
                              sendEnteredDatapackagevalue(
                                row?.id,
                                e.target.value
                              )
                            }
                            onChange={(e) =>
                              changeValueofanbulkdata(
                                row?.id,
                                e.target.value,
                                "packagevalue"
                              )
                            }
                            placeholder="ex: Dharan"
                          />
                        </div>
                      </TableCell>
                      <TableCell align="left">
                        <div className="bulktabeldata">
                          <input
                            value={row?.cod}
                            type="text"
                            onChange={(e) =>
                              changeValueofanbulkdata(
                                row?.id,
                                e.target.value,
                                "cod"
                              )
                            }
                            onBlur={(e) =>
                              sendEnteredDatacod(row?.id, e.target.value)
                            }
                            placeholder="ex: Dharan"
                          />
                        </div>
                      </TableCell>
                      <TableCell align="left">
                        <div className="bulktabeldata">
                          <input
                            value={row?.deliveryto}
                            type="text"
                            onBlur={(e) =>
                              sendEnteredDatadeliveryto(row?.id, e.target.value)
                            }
                            onChange={(e) =>
                              changeValueofanbulkdata(
                                row?.id,
                                e.target.value,
                                "deliveryto"
                              )
                            }
                            placeholder="ex: Dharan"
                          />
                        </div>
                      </TableCell>
                      <TableCell align="left">
                        <div className="bulktabeldata">
                          <input
                            value={row?.phone}
                            type="text"
                            placeholder="ex: Dharan"
                            onBlur={(e) =>
                              sendEnteredDataphone(row?.id, e.target.value)
                            }
                            onChange={(e) =>
                              changeValueofanbulkdata(
                                row?.id,
                                e.target.value,
                                "phone"
                              )
                            }
                          />
                        </div>
                      </TableCell>
                      <TableCell align="left">
                        <div className="bulktabeldata">
                          <input
                            value={row?.email}
                            type="text"
                            placeholder="ex: Dharan"
                            onBlur={(e) =>
                              sendEnteredDataemail(row?.id, e.target.value)
                            }
                            onChange={(e) =>
                              changeValueofanbulkdata(
                                row?.id,
                                e.target.value,
                                "email"
                              )
                            }
                          />
                        </div>
                      </TableCell>
                      <TableCell align="left">
                        <div className="bulktabeldata">
                          <input
                            value={row?.deliverylocation}
                            type="text"
                            placeholder="ex: Dharan"
                            onBlur={(e) =>
                              sendEnteredDatadeliverylocation(
                                row?.id,
                                e.target.value
                              )
                            }
                            onChange={(e) =>
                              changeValueofanbulkdata(
                                row?.id,
                                e.target.value,
                                "deliverylocation"
                              )
                            }
                          />
                        </div>
                      </TableCell>
                      <TableCell
                        onClick={() => setClickValue(row?.id)}
                        align="left"
                      >
                        <div className="bulktabeldata">
                          <MenuComp
                            onClickToConfirm={() =>
                              sendDataOnConfirmDelivery(row?.id)
                            }
                            onClickToRemove={onClickToRemove}
                            bulktabel
                          >
                            <BsThreeDotsVertical fontSize="20px" />
                          </MenuComp>
                        </div>
                      </TableCell>
                    </TableRow>
                  </>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <div className="simpletabel__button">
          <PrimaryButton onClick={sendDataOnConfirmAllDelivery}>
            Conform All
          </PrimaryButton>
          <SecondaryButton onClick={onClicktoAddmore}>Add More</SecondaryButton>
        </div>
      </div>
    </>
  );
}
