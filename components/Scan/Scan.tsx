"use client";
import React, { ChangeEvent, useState, useEffect } from "react";
import style from "./Scan.module.css";
import Button from "@/components/Button/Button";
import { getCookie, setCookie, deleteCookie } from "@/redux/cookies/cookieUtils";
import validateInn from "@/utils/InnValidation";
import { validateDocumentCount } from "@/utils/ValidationUtils";
import { validateDateRange } from "@/utils/ValidationUtils";

interface FormData {
  inputValue: string;
  totalityValue: string;
  documentCount: string;
  startDate: string;
  endDate: string;
  options: {
    maxRelevance: boolean;
    mentionInBusinessContext: boolean;
    mainRoleInPublication: boolean;
    publicationsOnlyWithRiskFactors: boolean;
    includeTechnicalNews: boolean;
    includeAnnouncementsAndCalendars: boolean;
    includeNewsDigests: boolean;
  };
}

const Scan = () => {
  const [formData, setFormData] = useState<FormData>({
    inputValue: "",
    totalityValue: "any",
    documentCount: "",
    startDate: "",
    endDate: "",
    options: {
      maxRelevance: false,
      mentionInBusinessContext: false,
      mainRoleInPublication: false,
      publicationsOnlyWithRiskFactors: false,
      includeTechnicalNews: false,
      includeAnnouncementsAndCalendars: false,
      includeNewsDigests: false,
    },
  });

  const [inputValueError, setInputValueError] = useState<string>("");
  const [documentCountError, setDocumentCountError] = useState<string>("");
  const [dateRangeError, setDateRangeError] = useState<string>("");

  const hasErrors = !!inputValueError || !!documentCountError || !!dateRangeError || !formData.inputValue || !formData.documentCount || (!formData.startDate && !formData.endDate);
  const searchButtonClassName = hasErrors ? `${style.searchButton} ${style.searchButtonDisabled}` : style.searchButton;

  useEffect(() => {
    const inputValue = getCookie("inputValue");
    const totalityValue = getCookie("totalityValue");
    const documentCount = getCookie("documentCount");
    const startDate = getCookie("startDate");
    const endDate = getCookie("endDate");
    const options = {
      maxRelevance: getCookie("maxRelevance") === "true",
      mentionInBusinessContext: getCookie("mentionInBusinessContext") === "true",
      mainRoleInPublication: getCookie("mainRoleInPublication") === "true",
      publicationsOnlyWithRiskFactors: getCookie("publicationsOnlyWithRiskFactors") === "true",
      includeTechnicalNews: getCookie("includeTechnicalNews") === "true",
      includeAnnouncementsAndCalendars: getCookie("includeAnnouncementsAndCalendars") === "true",
      includeNewsDigests: getCookie("includeNewsDigests") === "true",
    };

    setFormData({
      inputValue: inputValue ?? "",
      totalityValue: totalityValue ?? "any",
      documentCount: documentCount ?? "",
      startDate: startDate ?? "",
      endDate: endDate ?? "",
      options,
    });
  }, []);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === "inputValue") {
      const validationError = validateInn(value);
      setInputValueError(validationError ? validationError.message : "");
    } else if (name === "documentCount") {
      setDocumentCountError(validateDocumentCount(value));
    } else if (name === "startDate" || name === "endDate") {
      const { startDate, endDate } = formData;
      setDateRangeError(validateDateRange(startDate, endDate));
    }
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setCookie(name, value);
  };

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      options: {
        ...prevState.options,
        [name]: checked,
      },
    }));
    setCookie(name, checked.toString());
  };

  const handleSearchClick = () => {
    console.log("Поиск выполнен с параметрами:", formData);

    // Сброс значений формы
    setFormData({
      inputValue: "",
      totalityValue: "any",
      documentCount: "",
      startDate: "",
      endDate: "",
      options: {
        maxRelevance: false,
        mentionInBusinessContext: false,
        mainRoleInPublication: false,
        publicationsOnlyWithRiskFactors: false,
        includeTechnicalNews: false,
        includeAnnouncementsAndCalendars: false,
        includeNewsDigests: false,
      },
    });

    // Сброс ошибок ввода
    setInputValueError("");
    setDocumentCountError("");
    setDateRangeError("");

    // Удаление cookies
    deleteCookie("inputValue");
    deleteCookie("totalityValue");
    deleteCookie("documentCount");
    deleteCookie("startDate");
    deleteCookie("endDate");
    deleteCookie("maxRelevance");
    deleteCookie("mentionInBusinessContext");
    deleteCookie("mainRoleInPublication");
    deleteCookie("publicationsOnlyWithRiskFactors");
    deleteCookie("includeTechnicalNews");
    deleteCookie("includeAnnouncementsAndCalendars");
    deleteCookie("includeNewsDigests");
  };

  const { inputValue, totalityValue, documentCount, startDate, endDate, options } = formData;

  return (
    <div className={style.scanContainer}>
      <div className={style.inputSection}>
        <label>ИНН компании *</label>
        <input type="text" name="inputValue" value={inputValue} onChange={handleInputChange} placeholder="10 цифр" maxLength={10} className={`${style.input} ${inputValueError ? style.inputError : ""}`} />
        {inputValueError && <div className={style.errorTextInn}>{inputValueError}</div>}
        <label>Тональность</label>
        <select name="totalityValue" value={totalityValue} onChange={handleInputChange} className={style.input}>
          <option value="any">Любая</option>
          <option value="positive">Позитивная</option>
          <option value="negative">Негативная</option>
        </select>
        <label>Количество документов в выдаче *</label>
        <input type="text" name="documentCount" value={documentCount} onChange={handleInputChange} placeholder="от 1 до 1000" min={1} max={1000} className={`${style.input} ${documentCountError ? style.inputError : ""}`} />
        {documentCountError && <div className={style.errorTextTotality}>{documentCountError}</div>}
        <label>Диапазон поиска</label>
        <div className={style.dateRange}>
          <input type="date" name="startDate" value={startDate} onChange={handleInputChange} className={style.input} />
          <input type="date" name="endDate" value={endDate} onChange={handleInputChange} className={style.input} />
        </div>
        {dateRangeError && <div className={style.errorTextDate}>{dateRangeError}</div>}
      </div>
      <div className={style.optionsSection}>
        <label className={style.label}>
          <input type="checkbox" name="maxRelevance" checked={options.maxRelevance} onChange={handleCheckboxChange} className={style.checkbox} />
          Признак максимальной полноты
        </label>
        <label className={style.label}>
          <input type="checkbox" name="mentionInBusinessContext" checked={options.mentionInBusinessContext} onChange={handleCheckboxChange} className={style.checkbox} />
          Упоминания в бизнес-контексте
        </label>
        <label className={style.label}>
          <input type="checkbox" name="mainRoleInPublication" checked={options.mainRoleInPublication} onChange={handleCheckboxChange} className={style.checkbox} />
          Главная роль в публикации
        </label>
        <label className={style.label}>
          <input type="checkbox" name="publicationsOnlyWithRiskFactors" checked={options.publicationsOnlyWithRiskFactors} onChange={handleCheckboxChange} className={style.checkbox} />
          Публикации только с риск-факторами
        </label>
        <label className={style.label}>
          <input type="checkbox" name="includeTechnicalNews" checked={options.includeTechnicalNews} onChange={handleCheckboxChange} className={style.checkbox} />
          Включать технические новости рынков
        </label>
        <label className={style.label}>
          <input type="checkbox" name="includeAnnouncementsAndCalendars" checked={options.includeAnnouncementsAndCalendars} onChange={handleCheckboxChange} className={style.checkbox} />
          Включать анонсы и календари
        </label>
        <label className={style.label}>
          <input type="checkbox" name="includeNewsDigests" checked={options.includeNewsDigests} onChange={handleCheckboxChange} className={style.checkbox} />
          Включать сводки новостей
        </label>
        <div className={style.buttonContainer}>
          <Button buttonText="Поиск" onClick={handleSearchClick} className={searchButtonClassName} disabled={hasErrors} />
          <div className={style.ps}>* Обязательные к заполнению поля</div>
        </div>
      </div>
    </div>
  );
};

export default Scan;
