# json.id @message.id
# json.user_name @message.user.name
# # json.date @message.created_at.strftime("%Y/%m/%d %H:%M")
# json.date @message.created_at.to_s
json.content @message.content
json.image @message.image_url

json.id @message.id
json.user_name @message.user.name
json.date @message.created_at.to_s
# json.messages (@message, :content, :image)


