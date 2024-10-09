"use client";
import { Control, Controller, useFieldArray, useForm } from "react-hook-form";
import * as yup from "yup";

import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import clsx from "clsx";
import { ErrorMessage } from "@hookform/error-message";

/*
"links": [
    {
        "id": "51841",
        "name": "facebook",
        "platform": "facebook",
        "destination": "dddd",
        "position": 1,
        "private": false
    }
]

*/

const schema = yup.object().shape({
  links: yup.array().of(
    yup.object({
      id: yup.string(),
      name: yup.string().nullable(),
      //   platform: yup.string().required().nullable(),
      platform: yup.lazy(() =>
        yup.string().when("destination", {
          is: (val: string) => val && val !== "",
          then: (schema) => schema.required(),
          otherwise: (schema) => schema.optional().nullable(),
        })
      ),
      destination: yup.lazy(() =>
        yup.string().when("platform", {
          is: (val: string | null) => val == null,
          then: (schema) => schema.optional(),
          otherwise: (schema) => schema.required(),
        })
      ),
      private: yup.boolean(),
    })
  ),
});

// const schema = yup.object().shape({
//   id: yup.string(),
//   name: yup.string().nullable(),
//   //   platform: yup.string().required().nullable(),
//   platform: yup.lazy(() =>
//     yup.string().when("destination", {
//       is: (val: string) => val && val !== "",
//       then: (schema) => schema.required(),
//       otherwise: (schema) => schema.optional().nullable(),
//     })
//   ),
//   destination: yup.lazy(() =>
//     yup.string().when("platform", {
//       is: (val: string | null) => val == null,
//       then: (schema) => schema.optional(),
//       otherwise: (schema) => schema.required(),
//     })
//   ),
//   private: yup.boolean(),
// });

/**
 * if platform is null
 * I want destination to be nullable and not required
 *
 *
 * If destination is defined then I want platform to be required
 */

type LinksType = yup.InferType<typeof schema>;

const emptyLink = {
  name: "",
  platform: null as any,
  destination: "",
  private: false,
};

export default function Form() {
  const {
    handleSubmit,
    formState: { errors },
    getValues,
    register,
    control,
    watch,
    setValue,
  } = useForm<LinksType>({
    resolver: yupResolver(schema),
    defaultValues: {
      links: [
        {
          name: "",
          platform: null as any,
          destination: "",
          private: false,
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: control,
    name: "links",
  });

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  //   const platform = watch("platform");

  //   useEffect(() => {
  //     setValue("destination", "");
  //   }, [platform]);

  const addLink = () => {
    append(emptyLink);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        {fields.map((field, index) => {
          return (
            <div key={field.id}>
              <div>
                <input
                  key={field.id}
                  {...register(`links.${index}.destination`)}
                  className="border block w-full mb-3 p-3"
                  type="text"
                />
              </div>
              <div>
                <Dropdown
                  name={`links.${index}.platform`}
                  control={control}
                  errors={errors}
                  index={index}
                  setValue={setValue}
                />
              </div>
              <div className="flex gap-3">
                <span className="p-3 shadow-sm" onClick={addLink}>
                  Add
                </span>
                <span className="p-3 shadow-sm">Remove</span>
              </div>
            </div>
          );
        })}

        <div className="flex justify-between">
          <button type="submit" className="border p-3 shadow-sm rounded">
            submit
          </button>
        </div>

        <div className="mt-3"></div>
      </form>
    </div>
  );
}

const Dropdown = ({
  name,
  control,
  errors,
  index,
  setValue,
}: {
  name: string;
  control: Control<any>;
  errors: any;
  index: number;
  setValue: any;
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <div>
          <div className="flex gap-2 border p-1">
            <Item
              selected={field.value === null}
              text="Select"
              value={null}
              onClick={(v) => {
                setValue(`links.${index}.destination`, "");
                field.onChange(v);
              }}
            />
            <Item
              selected={field.value === "Facebook"}
              text="Facebook"
              value={"Facebook"}
              onClick={(v) => {
                setValue(`links.${index}.destination`, "");
                field.onChange(v);
              }}
            />
            <Item
              selected={field.value === "Google"}
              text="Google"
              value={"Google"}
              onClick={(v) => {
                setValue(`links.${index}.destination`, "");
                field.onChange(v);
              }}
            />
            <Item
              selected={field.value === "Youtube"}
              text="Youtube"
              value={"Youtube"}
              onClick={(v) => {
                setValue(`links.${index}.destination`, "");
                field.onChange(v);
              }}
            />
            <Item
              selected={field.value === "LinkedIn"}
              text="LinkedIn"
              value={"LinkedIn"}
              onClick={(v) => {
                setValue(`links.${index}.destination`, "");
                field.onChange(v);
              }}
            />
          </div>
          <ErrorMessage
            errors={errors}
            name={name}
            render={({ message }) => <p>{message}</p>}
          />
        </div>
      )}
    />
  );
};

const Item = ({
  text,
  value,
  onClick,
  selected,
}: {
  text: string;
  value: string | null;
  onClick: (value: string | null) => void;
  selected: boolean;
}) => {
  return (
    <div
      className={clsx(
        "cursor-pointer p-2 shadow-lg",
        selected ? "bg-gray-400" : ""
      )}
      onClick={() => onClick(value)}
    >
      {text}
    </div>
  );
};
