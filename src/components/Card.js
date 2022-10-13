import "../Card.css";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Input,
} from "reactstrap";
import Select from "react-select";
import { useEffect, useState, useRef } from "react";
import { useLoading } from "../context/SpinnerContextProvider";
import useDidMountEffect from "../customHooks/useDidMount";

function Card() {
  // external data

  const AREA_OPTIONS = [
    { value: "A", label: "A" },
    { value: "B", label: "B" },
    { value: "C", label: "C" },
    { value: "D", label: "D" },
    { value: "E", label: "E" },
    { value: "F", label: "F" },
  ];
  const STATUS_OPTIONS = [
    { value: "Active", label: "Active" },
    { value: "Disabled", label: "Disabled" },
  ];

  const CARDS = [
    { pumpId: 2001, area: "A", status: "Active" },
    { pumpId: 2002, area: "B", status: "Disabled" },
    { pumpId: 2004, area: "C", status: "Active" },
    { pumpId: 2005, area: "C", status: "Active" },
    { pumpId: 2006, area: "C", status: "Active" },
    { pumpId: 2007, area: "C", status: "Active" },
    { pumpId: 2008, area: "C", status: "Active" },
    { pumpId: 2009, area: "C", status: "Active" },
  ];

  // selector styling
  const colourStyles = {
    control: (styles) => ({
      ...styles,
      borderRadius: "1000px",
    }),
  };

  // states

  const [modal, setModal] = useState(false);
  const [search, setSearch] = useState("");
  const [errorMsg, setError] = useState("");
  const [index, setindexOrder] = useState(3);
  const [selectedSearch, setSelected] = useState({});
  const [pumpIdModal, setPumpId] = useState("");
  const [pumpAreaModal, setPumpAreaModal] = useState(null);
  const [cards, setCards] = useState([]);
  const [original, setOrignal] = useState([]);

  const keys = ["pumpId", "area", "status"];
  const bottomRef = useRef(null);
  const { setLoading } = useLoading();
  const toggle = () => setModal(!modal);

  useEffect(() => {
    setLoading(true);
    init();
    setTimeout(() => {
      setLoading(false);
    }, 500);
    // eslint-disable-next-line
  }, []);

  useDidMountEffect(() => {
    filter();
  }, [selectedSearch]);

  const init = () => {
    setCards(CARDS);
    setOrignal(CARDS);
    reorder(0);
  };

  const selectChangeFn = (e, fnName) => {
    setSelected((prev) => (prev = { ...prev, [fnName]: e }));
  };

  const showMore = () => {
    setLoading(true);
    reorder(2);
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });

    setTimeout(() => {
      setLoading(false);
    }, 300);
  };

  const reorder = (param) => {
    setindexOrder(index + param);
  };

  const searchFn = (data) => {
    return data.filter((item) =>
      keys.some((key) => {
        return item[key].toString().toLowerCase().includes(search);
      })
    );
  };

  const filter = (param = false) => {
    let res = [];
    let resOrgSwitch = [];
    if (param) {
      resOrgSwitch = original.map((v) => {
        if (v.pumpId === param) {
          return {
            ...v,
            status: v.status === "Active" ? "Disabled" : "Active",
          };
        } else {
          return v;
        }
      });
    }

    let searchTerm = param ? resOrgSwitch : original;

    if (selectedSearch["area"]?.value && selectedSearch["status"]?.value) {
      res = searchTerm.filter(
        (item) =>
          item["area"] === selectedSearch["area"]?.value &&
          item["status"] === selectedSearch["status"]?.value
      );
    } else {
      res = searchTerm.filter(
        (item) =>
          item["area"] === selectedSearch["area"]?.value ||
          item["status"] === selectedSearch["status"]?.value
      );
    }

    if (
      res.length === 0 &&
      !selectedSearch["area"] &&
      !selectedSearch["status"]
    ) {
      setCards(searchTerm);
      if (param) {
        setOrignal(resOrgSwitch);
      }
    } else {
      setCards(res);
      if (param) {
        setOrignal(resOrgSwitch);
      }
    }
  };

  const deleteCard = (id) => {
    setLoading(true);
    setCards((prev) => prev.filter((v) => v.pumpId !== id));
    setOrignal((prev) => prev.filter((v) => v.pumpId !== id));
    setTimeout(() => {
      setLoading(false);
    }, 300);
  };

  const creatPump = () => {
    try {
      let err = false;
      if (!pumpAreaModal?.value || !pumpIdModal) {
        err = true;
        setError("All fields are required!");
      }

      if (
        pumpIdModal &&
        original.find((v) => v.pumpId.toString() === pumpIdModal)
      ) {
        err = true;
        setError("Pump number already exists!");
      }

      if (err) return;

      setError("");
      setPumpAreaModal(null);
      setPumpId("");

      setCards((prev) => [
        ...prev,
        { pumpId: pumpIdModal, area: pumpAreaModal.value, status: "Active" },
      ]);
      setOrignal((prev) => [
        ...prev,
        { pumpId: pumpIdModal, area: pumpAreaModal.value, status: "Active" },
      ]);

      setLoading(true);

      toggle();
      setTimeout(() => {
        setLoading(false);
      }, 300);
    } catch (error) {}
  };

  const isVisible = () => {
    if (index < searchFn(cards).length) {
      return true;
    }
  };

  return (
    <div className="container-section">
      <div className="title-section">
        <div className="title">Ventilation pump overview</div>
        <div onClick={toggle} className="create-btn">
          <span className="plus">+ </span>Create new pump
        </div>
      </div>

      <div className="search-section">
        <div className="search-pump">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value.toLowerCase())}
            placeholder="Search pump number"
          ></input>
        </div>

        <div className="search-area">
          <Select
            styles={colourStyles}
            placeholder="Area"
            isClearable
            value={selectedSearch["area"]}
            onChange={(e) => selectChangeFn(e, "area")}
            options={AREA_OPTIONS}
          />
        </div>
        <div className="search-status">
          <Select
            styles={colourStyles}
            placeholder="Status"
            isClearable
            onChange={(e) => selectChangeFn(e, "status")}
            value={selectedSearch["status"]}
            options={STATUS_OPTIONS}
          />
        </div>
      </div>
      {searchFn(cards).length !== 0 ? (
        <div className="cards-section">
          {searchFn(cards)
            .slice(0, index)
            .map((v) => (
              <div key={v.pumpId} className="card-list">
                <div>
                  <div className="card-title">Validation pump number</div>
                  <div>{v.pumpId}</div>
                </div>
                <div>
                  <div className="card-title">Area</div>
                  <div>{v.area}</div>
                </div>
                <div>
                  <div className="card-title">Status</div>
                  <div
                    className={` ${v.status === "Active" ? "green" : "brown"} `}
                  >
                    {v.status}
                  </div>
                </div>
                <div>
                  <div className="card-title" style={{ textAlign: "center" }}>
                    Actions
                  </div>
                  <div className="action">
                    <div>
                      <Form>
                        <FormGroup switch>
                          <Input
                            type="switch"
                            role="switch"
                            id={v.pumpId}
                            checked={v.status === "Active"}
                            onChange={() => filter(v.pumpId)}
                          />
                        </FormGroup>
                      </Form>
                    </div>

                    <div>
                      <img
                        onClick={() => deleteCard(v.pumpId)}
                        src="../../icon-refuse.svg"
                        alt="delete"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}

          <div
            onClick={showMore}
            className={`btn-more ${!isVisible() ? "visible" : ""} `}
          >
            Show more
          </div>
        </div>
      ) : (
        <div className="no-records">No records found!</div>
      )}

      <Modal
        centered
        backdrop="static"
        size="sm"
        isOpen={modal}
        toggle={toggle}
      >
        <ModalHeader toggle={toggle}>Create a new pump</ModalHeader>
        <ModalBody>
          <div className="modal-body-section">
            <div className="pump-modal">
              <input
                onChange={(e) => setPumpId(e.target.value)}
                value={pumpIdModal}
                type="text"
                placeholder="Pump number"
              ></input>
            </div>

            <div className="area-modal">
              <Select
                styles={colourStyles}
                placeholder="Area"
                isClearable
                onChange={(e) => setPumpAreaModal(e)}
                value={pumpAreaModal}
                options={AREA_OPTIONS}
              />
            </div>
          </div>
          <div className="error">{errorMsg}</div>
        </ModalBody>
        <ModalFooter>
          <Button style={{ background: "#4b45e7" }} onClick={creatPump}>
            Create
          </Button>{" "}
          <Button style={{ background: "#130f30" }} onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>

      <div ref={bottomRef}></div>
    </div>
  );
}

export default Card;
