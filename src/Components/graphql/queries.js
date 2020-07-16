import axios from "axios"

const url = "http://localhost:4000/graphql"

export const getUserProfileData = async (uuid) => {
  return axios({
    url: url,
    method: "post",
    headers: {
      "Content-Type": "application/json"
    },
    data: {
      query: `query {
  users (uuid: "${uuid}") {
                username
            pronoun
            email
            firstName
            lastName
            age
            yearsOfExperience
            department
            description
            role
            isMentor
            isMentee
            interests
            education {
            school
            gradDate
            major
            degreeType
            }
            department
            location
  }
}
            `
    }
  })
    .then((response) => { return response.data.data })
    .catch((error) => console.log(error.response.data))
}

export const getAllUserData = async () => {
  return axios({
    url: url,
    method: "post",
    headers: {
      "Content-Type": "application/json"
    },
    data: {
      query: `query {
            users {
                username
                pronoun
                email
                firstName
                lastName
                age
                yearsOfExperience
                department
                description
                role
                isMentor
                isMentee
                interests
                education {
                  school
                  gradDate
                  major
                  degreeType
                }
                department
                location
                }
              }
            `
    }
  })
    .then((response) => { return response.data.data })
    .catch((error) => console.log(error.response.data))
}