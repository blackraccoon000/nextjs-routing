import classes from "./EventsSearch.module.css";
import Button from "../ui/Button";
import React, { FormEventHandler, useRef } from "react";
import PropTypes from "prop-types";

const EventsSearch = ({
  onSearch,
}: {
  onSearch: (year: string, month: string) => void;
}) => {
  const yearInputRef: React.RefObject<HTMLSelectElement> =
    useRef<HTMLSelectElement>(null);
  const monthInputRef: React.RefObject<HTMLSelectElement> =
    useRef<HTMLSelectElement>(null);

  const submitHandler: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const selectedYear: string | undefined = yearInputRef.current?.value;
    const selectedMonth: string | undefined = monthInputRef.current?.value;
    if (!!selectedYear && !!selectedMonth)
      onSearch(selectedYear, selectedMonth);
  };
  return (
    <form action="" className={classes.form} onSubmit={submitHandler}>
      <div className={classes.controls}>
        <div className={classes.control}>
          <label htmlFor="year">Year</label>
          <select name="year" id="year" ref={yearInputRef}>
            <option value="2021">2021</option>
            <option value="2022">2022</option>
          </select>
        </div>
        <div className={classes.control}>
          <label htmlFor="month">Month</label>
          <select name="month" id="month" ref={monthInputRef}>
            <option value="1">January</option>
            <option value="2">February</option>
            <option value="3">March</option>
            <option value="4">April</option>
            <option value="5">May</option>
            <option value="6">June</option>
            <option value="7">July</option>
            <option value="8">August</option>
            <option value="9">September</option>
            <option value="10">October</option>
            <option value="11">November</option>
            <option value="12">December</option>
          </select>
        </div>
        <Button>Find Button</Button>
      </div>
    </form>
  );
};

EventsSearch.propTypes = {
  onSearch: PropTypes.func,
};

export default EventsSearch;
