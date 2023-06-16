import * as yup from "yup";
export default {
  login: yup.object().shape({
    email: yup.string()
      .required("이메일 주소를 입력해 주세요.")
      .email("이메일 형식에 맞지 않습니다."),
    password: yup.string()
      .min(4, "비밀번호는 최소 4자이상이어야 합니다.")
      .required("비밀번호를 입력해 주세요."),
  }),
  register: yup.object().shape({
    email: yup.string()
      .required("이메일 주소를 입력해 주세요.")
      .email("이메일 형식에 맞지 않습니다."),
    username: yup.string()
      .min(2, "이름은 최소2자 이상입니다.")
      .required("이름을 입력해 주세요."),
    password: yup.string()
      .min(4, "비밀번호는 최소 4자이상이어야 합니다.")
      .required("비밀번호를 입력해 주세요."),
  }),
}
