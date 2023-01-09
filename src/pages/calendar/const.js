import { FormattedMessage } from "react-intl";
import React, { useState, useEffect } from "react";

export const TABS = {
  community: "community",
  events: "events",
  tournaments: "tournaments",
};

export const CALENDAR_ROUTES = {
  community: "/calendar/community",
  events: "/calendar/events",
  tournaments: "/calendar/tournaments",
  empty: "/",
};

export const Months = [
  {
    id: "2022-01",
    title: "jan",
    month: "2022-01",
  },
  {
    id: "2022-02",
    title: "feb",
    month: "2022-02",
  },
  {
    id: "2022-03",
    title: "march",
    month: "2022-03",
  },
  {
    id: "2022-04",
    title: "apr",
    month: "2022-04",
  },
  {
    id: "2022-05",
    title: "may",
    month: "2022-05",
  },
  {
    id: "2022-06",
    title: "jun",
    month: "2022-06",
  },
  {
    id: "2022-07",
    title: "jul",
    month: "2022-07",
  },
  {
    id: "2022-08",
    title: "aug",
    month: "2022-08",
  },
  {
    id: "2022-09",
    title: "sep",
    month: "2022-09",
  },
  {
    id: "2022-10",
    title: "oct",
    month: "2022-10",
  },
  {
    id: "2022-11",
    title: "nov",
    month: "2022-11",
  },
  {
    id: "2022-12",
    title: "dec",
    month: "2022-12",
  },
];
// export const Regions = [
//   {
//     id: 0,
//     title: <FormattedMessage id="calendar.filter.region.western",
//   },
//   {
//     id: 1,
//     title: <FormattedMessage id="calendar.filter.region.eastern",
//   },
//   {
//     id: 2,
//     title: <FormattedMessage id="calendar.filter.region.southern",
//   },
//   {
//     id: 3,
//     title: <FormattedMessage id="calendar.filter.region.northen",
//   },
// ];
// export const Countries = [
//   {
//     id: 0,
//     title: <FormattedMessage id="calendar.filter.countries.nigeria",
//   },
//   {
//     id: 1,
//     title: <FormattedMessage id="calendar.filter.countries.rodesia",
//   },
//   {
//     id: 2,
//     title: <FormattedMessage id="calendar.filter.countries.kongo",
//   },
//   {
//     id: 3,
//     title: <FormattedMessage id="calendar.filter.countries.uganda",
//   },
// ];
// export const Games = [
//   {
//     id: 0,
//     title: "hi",
//   },
//   {
//     id: 1,
//     title: <FormattedMessage id="calendar.filter.game.dota",
//   },
//   {
//     id: 2,
//     title: <FormattedMessage id="calendar.filter.game.csgo",
//   },
//   {
//     id: 3,
//     title: <FormattedMessage id="calendar.filter.game.mortal",
//   },
// ];
