import { useForm } from "react-hook-form";
import {
  Select,
  chakraComponents,
  GroupBase,
  SelectComponentsConfig,
} from "chakra-react-select";
import { useRef, useState } from "react";
import { AddIcon, CloseIcon, CheckIcon } from "@chakra-ui/icons";
import { Spinner } from "@chakra-ui/react";

import "./CustomForm.css";

const defaultValue = [
  { tech: "Java" },
  { tech: "Python" },
  { tech: "CPP" },
  { tech: "C#" },
];

const defaultOptions = [
  { value: "male", label: "Male", color: "white" },
  { value: "female", label: "Female" },
  { value: "other", label: "Other" },
];

function CustomForm() {
  const [showSubmittedScreen, setShowSubmittedScreen] = useState(false);
  const [submittedData, setSubmittedData] = useState({});
  const [showLoading, setShowLoading] = useState(false);

  const customComponents: SelectComponentsConfig<true, GroupBase> = {
    Option: ({ children, ...props }) => (
      <chakraComponents.Option {...props}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "row",
            width: "100%",
            alignItems: "center",
          }}
        >
          {children}
          {console.log("chilkdre", children)}
          {getValues("gender") == children && <CheckIcon />}
        </div>
      </chakraComponents.Option>
    ),
  };

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      gender: "",
      dateOfBirth: "",
      techStack: "",
      techList: [],
    },
  });

  watch("techList");
  // watch("gender")
  console.log("gender", getValues("gender"), errors);

  const removeTechStack = (val: string) => {
    let modifiedList = getValues("techList").filter(
      (techStack: string) => techStack != val
    );
    setValue("techList", modifiedList);
  };

  return (
    <form
      onSubmit={handleSubmit((data) => {
        console.log(data);
        setShowLoading(true);
        setTimeout(() => {
          setShowSubmittedScreen(true);
          setSubmittedData(data);
        }, 3000);
      })}
    >
      {showSubmittedScreen ? (
        <div>
          <div className="info-container">
            <label>First Name: </label>
            <h4>{submittedData?.firstName}</h4>
          </div>
          <div className="info-container">
            <label>Last Name: </label>
            <h4>{submittedData?.lastName}</h4>
          </div>
          <div className="info-container">
            <label>Gender: </label>
            <h4>{submittedData?.gender}</h4>
          </div>
          <div className="info-container">
            <label>Tech Stack: </label>
            {submittedData.techList.map((tech, i) => (
              <h4>
                {tech}
                {(submittedData.techList.length - 1 != i) && ","}
              </h4>
            ))}
          </div>
        </div>
      ) : showLoading ? (
        <Spinner />
      ) : (
        <>
          <h1 className="title">Basic Details</h1>
          <div className="form-container">
            <div className="form-Basic-details">
              <div className="form-element">
                <label>First Name</label>
                <input
                  placeholder="First Name"
                  {...register("firstName", {
                    required: true,
                    pattern:
                      /^[a-zA-Z]+(?:-[a-zA-Z]+)*(?: [a-zA-Z]+(?:-[a-zA-Z]+)*)*$/,
                  })}
                />
                {errors?.firstName?.type && (
                  <p>
                    {errors?.firstName?.type == "required"
                      ? "Name is required"
                      : "Name is incorrect"}
                  </p>
                )}
              </div>
              <div className="form-element">
                <label>Last Name</label>
                <input
                  placeholder="Last Name"
                  {...register("lastName", {
                    required: true,
                    pattern:
                      /^[a-zA-Z]+(?:-[a-zA-Z]+)*(?: [a-zA-Z]+(?:-[a-zA-Z]+)*)*$/,
                  })}
                />
                {errors?.lastName?.type && (
                  <p>
                    {errors?.lastName?.type == "required"
                      ? "Name is required"
                      : "Name is incorrect"}
                  </p>
                )}
              </div>
            </div>
            <h1 className="title">Other Information</h1>
            <div className="form-other-details">
              <div className="form-element">
                <label>Gender</label>
                <Select
                  className="genderSelect"
                  // name="Gender"
                  options={defaultOptions}
                  placeholder="Gender"
                  closeMenuOnSelect={false}
                  components={customComponents}
                  size="lg"
                  // {...register("gender", {
                  //   required: true,
                  //   onChange: (e) => console.log("g", e),
                  // })}
                  selectedOptionColorScheme="#d7d7d7"
                  onChange={(val: any) => setValue("gender", val.label)}
                />
                {errors?.gender?.type == "required" && (
                  <p>Gender is required</p>
                )}
              </div>
              <div className="form-element">
                <label>Date of Birth</label>
                <input
                  type="date"
                  placeholder="Date"
                  {...register("dateOfBirth", { required: true })}
                />
                {errors?.dateOfBirth?.type == "required" && (
                  <p>DOB is required</p>
                )}
              </div>
            </div>
            <div className="form-tech-stack">
              <div>
                <div className="tech-stack_header">
                  <label>Tech Stack</label>
                  <AddIcon
                    boxSize={4}
                    onClick={() => {
                      if (getValues("techStack")?.length == 0) {
                        return;
                      }
                      setValue("techList", [
                        ...getValues("techList"),
                        getValues("techStack"),
                      ]);
                      setValue("techStack", "");
                    }}
                  />
                </div>
                <input
                  type="text"
                  placeholder="Enter tech stack"
                  {...register("techStack", {
                    pattern: /^[a-zA-Z0-9_-]+(?:,[a-zA-Z0-9_-]+)*$/,
                  })}
                />
                {getValues("techList").length == 0 && (
                  <p>
                    {errors?.techStack?.type == "required"
                      ? "Tech Stack is required"
                      : "Invalid Tech Stack"}
                  </p>
                )}
              </div>
              <div className="form-tech-list">
                {getValues("techList").map((val, i) => (
                  <div className="tech-stack_list" key={i}>
                    <h2>{val}</h2>
                    <CloseIcon
                      color={"black"}
                      onClick={() => removeTechStack(val)}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "flex-end",
            }}
          >
            <input type="submit" value="Submit" className="submit-btn" />
          </div>
        </>
      )}
    </form>
  );
}

export default CustomForm;
