import React from "react"
import { IoSearchOutline } from "react-icons/io5";

import InputField from "./InputField"

const SearchInputField = (props:any) => {
  return (
    <InputField
      leftAdornment={<IoSearchOutline className="text-2xl" />}
      className="h-full border-none"
      {...props}
    />
  )
}

export default SearchInputField
