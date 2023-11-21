"use client";

import Select from "react-select";
import { useController, useForm } from "react-hook-form";
import useCountries from "@/lib/hooks/useCountries";
import Chart from "chart.js/auto";

import { Form, FormControl, FormField } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

import React, { forwardRef, useImperativeHandle, useState } from "react";
import useIndicators from "@/lib/hooks/useIndicators";
import useQuery, { QueryCreate, QueryResult } from "@/lib/hooks/useQuery";
import Loading from "../Loading";
import { yearsRange } from "@/lib/utils";

// Form where the user can select the parameters to build a query
const QueryForm = forwardRef((props, ref) => {
  // This is used for the parent component to be able to call the runOldQuery function
  // when a community query is tapped
  useImperativeHandle(
    ref,
    () => ({
      runOldQuery,
    }),
    []
  );

  const {
    username,
    setUsername,
    setIsQueryDisplayed,
    setCurrentQueryId,
    getAllQueries,
  } = props;

  const { countries, isCountryListLoading } = useCountries();
  const { indicators, isIndicatorsListLoading } = useIndicators();
  const years = yearsRange();
  const { createQuery, isQueryLoading } = useQuery();
  const [hideVisualBuilder, setHideVisualBuilder] = useState<boolean>(false);
  const [queryResult, setQueryResult] = useState<QueryResult[]>([]);
  const [resumeSearch, setResumeSearch] = useState<boolean>(false);

  const { control, handleSubmit, reset, setValue } = useForm({
    defaultValues: {
      country: "",
      indicator: "",
      year: "",
      queryName: "",
      queryDescription: "",
      username: "",
    },
  });
  const { field: countryField } = useController({ name: "country", control });
  const { field: indicatorField } = useController({
    name: "indicator",
    control,
  });
  const { field: yearField } = useController({ name: "year", control });

  const form = useForm();

  const {
    value: countryValue,
    onChange: onCountryChange,
    ...countryRestField
  } = countryField;
  const {
    value: indicatorValue,
    onChange: onIndicatorChange,
    ...indicatorRestField
  } = indicatorField;
  const {
    value: yearValue,
    onChange: onYearChange,
    ...yearRestField
  } = yearField;

  const selectorStyleProps = {
    control: (_, __) => ({
      ..._,
      border: "none",
      backgroundColor: "#101012",
      width: "50%",
    }),
    singleValue: (_, __) => ({
      ..._,
      color: "#FFFFFF",
    }),
  };

  const resetVisualBuilder = () => {
    setHideVisualBuilder(false);
    setQueryResult([]);
    setIsQueryDisplayed(false);
    clearCanvas();
    reset({}, { keepValues: false });
  };

  const clearCanvas = () => {
    var currentChart = document.getElementById("chart");
    // Remove the old canvas
    currentChart.parentNode.removeChild(currentChart);
    var chartDivElement = document.getElementById("chartDiv");
    var newCanvas = document.createElement("canvas");
    newCanvas.id = "chart";
    chartDivElement?.appendChild(newCanvas);
  };

  const runOldQuery = (query: QueryCreate, isMyQuery: boolean) => {
    setValue(
      "country",
      countries.find((x) => x.value === query.country_code)
    );
    onSubmit(
      {
        username: query.username,
        indicator: query.indicator_code,
        year: query.year,
        country: query.country_code,
        id: query.id,
      },
      isMyQuery,
      true
    );
  };

  const onSubmit = async (data, isMyQuery?: boolean, isOldQuery?: boolean) => {
    resetVisualBuilder();
    if (!isMyQuery) {
      setHideVisualBuilder(true);
    } else {
      if (!username) setUsername(data.username);
      if (isOldQuery) setResumeSearch(true);
    }
    const result = await createQuery(
      {
        indicator_code: data.indicator,
        year: data.year,
        country_code: data.country,
        username: data.username || username,
        name: data.queryName,
        description: data.queryDescription,
      },
      !isOldQuery
    );
    setCurrentQueryId(data.id);
    setQueryResult(result);
    setIsQueryDisplayed(true);
    getAllQueries();
    new Chart(document.getElementById("chart").getContext("2d"), {
      type: "bar",
      data: {
        labels: result.map((row) => row.year),
        datasets: [
          {
            label: indicatorField.name + indicatorField.value,
            data: result.map((row) => row.value),
          },
        ],
      },
    });
  };

  return (
    <div>
      {isQueryLoading ? (
        <div className="flex flex-col justify-center items-center">
          <h2 className="text-base-semibold text-light-2">Fetching data</h2>
          <Loading />
        </div>
      ) : (
        <>
          {hideVisualBuilder ? (
            <div>
              <h2 className="text-small-medium text-gray-1">
                You are exploring others' searches, use this to do more research
                on the topic!
              </h2>
              <h2 className="text-small-medium text-gray-1 py-4">
                Click here to go back to the visual builder
              </h2>
              <Button
                onClick={() => {
                  resetVisualBuilder();
                }}
                size="sm"
                className="community-card_btn"
              >
                Visual builder
              </Button>
            </div>
          ) : (
            <Form {...form}>
              <form onSubmit={handleSubmit((data) => onSubmit(data, true))}>
                {resumeSearch && (
                  <h2 className="text-small-medium text-gray-1">
                    Here it is! This is your previous search, you can modify it
                    and save it to continue your research!
                  </h2>
                )}
                <h2 className="text-base-semibold text-light-2 pt-2 pb-1">
                  Select country
                </h2>
                {isCountryListLoading ? (
                  <Loading />
                ) : (
                  <Select
                    styles={selectorStyleProps}
                    maxMenuHeight={80}
                    className="select-input"
                    placeholder="Select country"
                    isClearable={true}
                    options={countries}
                    value={
                      countryValue
                        ? countries.find((x) => x.value === countryValue)
                        : countryValue
                    }
                    onChange={(option) =>
                      onCountryChange(option ? option.value : option)
                    }
                    {...countryRestField}
                  />
                )}
                <h2 className="text-base-semibold text-light-2 pt-2 pb-1">
                  Select indicator
                </h2>
                {isIndicatorsListLoading ? (
                  <Loading />
                ) : (
                  <div>
                    <Select
                      styles={{
                        ...selectorStyleProps,
                        control: (_, __) => ({
                          ..._,
                          width: "80%",
                          backgroundColor: "#101012",
                          border: "none",
                        }),
                      }}
                      className="select-input"
                      placeholder="Select indicator"
                      isClearable={true}
                      options={indicators}
                      value={
                        indicatorValue
                          ? indicators.find((x) => x.value === indicatorValue)
                          : indicatorValue
                      }
                      onChange={(option) =>
                        onIndicatorChange(option ? option.value : option)
                      }
                      {...indicatorRestField}
                    />

                    <h2 className="text-base-semibold text-light-2 pt-2 pb-1">
                      Select year
                    </h2>
                    <Select
                      styles={selectorStyleProps}
                      className="select-input"
                      placeholder="Select year"
                      isClearable={true}
                      options={years}
                      value={
                        yearValue
                          ? years.find((x) => x.value === yearValue)
                          : yearValue
                      }
                      onChange={(option) =>
                        onYearChange(option ? option.value : option)
                      }
                      {...yearRestField}
                    />

                    <h2 className="text-base-semibold text-light-2 pt-2 pb-1">
                      Please give your query a name
                    </h2>
                    <FormField
                      control={control}
                      name="queryName"
                      render={({ field }) => (
                        <FormControl className="no-focus border border-dark-4 bg-dark-3 text-light-1">
                          <Input {...field} />
                        </FormControl>
                      )}
                    />

                    <h2 className="text-base-semibold text-light-2 pt-2 pb-1">
                      Please give your query a description (such as some
                      insights on the purpose of the research or why this is
                      important)
                    </h2>
                    <FormField
                      control={control}
                      name="queryDescription"
                      render={({ field }) => (
                        <FormControl className="no-focus border border-dark-4 bg-dark-3 text-light-1">
                          <Textarea rows={2} {...field} />
                        </FormControl>
                      )}
                    />
                    {!username && (
                      <div>
                        <h2 className="text-base-semibold text-light-2 pt-2 pb-1">
                          Please enter a username to record your search (it will
                          be saved locally for further searches)
                        </h2>
                        <FormField
                          control={control}
                          name="username"
                          render={({ field }) => (
                            <FormControl className="no-focus border border-dark-4 bg-dark-3 text-light-1">
                              <Input {...field} />
                            </FormControl>
                          )}
                        />
                      </div>
                    )}
                    <Button className="bg-primary-500">Run query</Button>
                  </div>
                )}
                {queryResult.length > 0 && (
                  <h2 className="text-base-semibold text-light-2 pt-8 pb-4">{`Results for ${
                    queryResult[0]?.countryName || ""
                  } regarding the study "${
                    queryResult[0].indicatorName
                  }":`}</h2>
                )}
              </form>
            </Form>
          )}
        </>
      )}
      <div id="chartDiv" className="chart-container">
        <canvas id="chart"></canvas>
      </div>
    </div>
  );
});

export default QueryForm;
