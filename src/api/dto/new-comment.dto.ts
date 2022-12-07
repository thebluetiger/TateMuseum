export class NewCommentDto {
  userID?: number;
  name?: string;
  content: string;
}

/*
Data to send when creating a new comment
● userID: STRING - optional
● name: STRING - required if there no user ID is sent,
● content: STRING, required
Logic
● Each art entry can only have one comment by a non-user of that name. For example,
name “John” can only leave one comment per art entry.
● However, if a user ID is present and verified, the user can add as many comments as
they want per art entry.
*/
