"use client";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

export default function MedidaConverter() {
  const { t } = useTranslation();

  // A estrutura de dados permanece a mesma
  const units = {
    length: {
      label: t('MeasureConverter.length'),
      units: { m: "Metro", cm: "Centímetro", in: "Polegada", ft: "Pé", km: "Quilômetro", mi: "Milha" },
      convert: (value: number, from: string, to: string) => {
        const conversions: Record<string, number> = { m: 1, cm: 0.01, in: 0.0254, ft: 0.3048, km: 1000, mi: 1609.34 };
        return (value * conversions[from]) / conversions[to];
      },
    },
    weight: {
      label: t('MeasureConverter.weight'),
      units: { kg: "Quilo", g: "Grama", lb: "Libra", oz: "Onça", mg: "Miligramas", t: "Tonelada" },
      convert: (value: number, from: string, to: string) => {
        const conversions: Record<string, number> = { kg: 1, g: 0.001, mg: 0.000001, lb: 0.453592, oz: 0.0283495, t: 1000 };
        return (value * conversions[from]) / conversions[to];
      },
    },
    temperature: {
      label: t('MeasureConverter.temperature'),
      units: { C: "Celsius", F: "Fahrenheit", K: "Kelvin" },
      convert: (value: number, from: string, to: string) => {
        if (from === to) return value;
        const celsius = from === "C" ? value : from === "F" ? (value - 32) * (5 / 9) : value - 273.15;
        return to === "C" ? celsius : to === "F" ? (celsius * 9) / 5 + 32 : celsius + 273.15;
      },
    },
  };

  type UnitType = keyof typeof units;
  type UnitKey<T extends UnitType> = keyof (typeof units)[T]["units"];

  const [type, setType] = useState<UnitType>("length");
  const [from, setFrom] = useState<UnitKey<UnitType>>("m" as UnitKey<UnitType>);
  const [to, setTo] = useState<UnitKey<typeof type>>("cm" as UnitKey<typeof type>);
  const [value, setValue] = useState<string>("");

  const result = value ? units[type].convert(parseFloat(value), from, to).toFixed(4) : "";

  const handleTypeChange = (val: UnitType) => {
    setType(val);
    const [first, second] = Object.keys(units[val].units);
    setFrom(first as UnitKey<typeof val>);
    setTo(second as UnitKey<typeof val>);
  };

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (inputValue === "" || !isNaN(Number(inputValue))) {
      setValue(inputValue);
    }
  };

  // Função auxiliar para obter o rótulo da unidade de forma segura
  const getUnitLabel = (type: UnitType, key: string) => {
    return (units[type].units as Record<string, string>)[key];
  };

  return (
    <section
      id="medidas"
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-white to-blue-400 px-6 dark:from-black dark:to-black/90"
    >
      <h1 className="font-bold mb-5 text-2xl text-center">
        {t('MeasureConverter.page_title')}
      </h1>

      <div className="w-full max-w-xl">
        <div
          data-aos="zoom-in"
          className="bg-white dark:bg-zinc-900 border border-gray-300 dark:border-zinc-700 rounded-2xl shadow-lg p-8"
        >
          <h2 className="text-3xl font-bold mb-4 text-center">
            {t('MeasureConverter.converter_title')}
          </h2>
          <span className="block text-center text-sm text-gray-500 mb-6">
            {t('MeasureConverter.converter_subtitle')}
          </span>

          <div className="space-y-4">
            <select
              value={type}
              onChange={(e) => handleTypeChange(e.target.value as UnitType)}
              className="w-full border rounded-md p-2 dark:bg-zinc-800 dark:text-white"
            >
              {Object.entries(units).map(([key, data]) => (
                <option key={key} value={key}>
                  {data.label}
                </option>
              ))}
            </select>

            <input
              type="text"
              placeholder={t('MeasureConverter.value_placeholder') || 'Valor'}
              value={value}
              onChange={handleValueChange}
              className="w-full border rounded-md p-2 dark:bg-zinc-800 dark:text-white"
            />

            <div className="grid grid-cols-2 gap-2">
              <select
                value={from}
                onChange={(e) => setFrom(e.target.value as UnitKey<typeof type>)}
                className="w-full border rounded-md p-2 dark:bg-zinc-800 dark:text-white"
              >
                {Object.entries(units[type].units).map(([key, label]) => (
                  <option key={key} value={key}>
                    {label}
                  </option>
                ))}
              </select>

              <select
                value={to}
                onChange={(e) => setTo(e.target.value as UnitKey<typeof type>)}
                className="w-full border rounded-md p-2 dark:bg-zinc-800 dark:text-white"
              >
                {Object.entries(units[type].units).map(([key, label]) => (
                  <option key={key} value={key}>
                    {label}
                  </option>
                ))}
              </select>
            </div>

            {/* CÓDIGO CORRIGIDO AQUI */}
            {value && (
              <div className="text-center mt-4 text-xl font-medium">
                {value} {getUnitLabel(type, from)} ={" "}
                <span className="text-blue-600 dark:text-blue-400 font-bold">
                  {result} {getUnitLabel(type, to)}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}