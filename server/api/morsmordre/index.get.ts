import useDatabase from "~~/server/utils/database/users"

export default defineEventHandler((/* event */) => {
    return useDatabase().getMorsmordre()
})
