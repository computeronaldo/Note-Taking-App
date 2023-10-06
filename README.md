Inside App.js

```
export type RawNote = {
  id: string;
} & RawNoteData;

export type RawNoteData = {
  title: string;
  markdown: string;
  tagIds: string[];
};

export type Note = {
  id: string;
} & NoteData;

export type NoteData = {
  title: string;
  markdown: string;
  tags: Tag[];
};

export type Tag = {
  id: string;
  label: string;
};

```

# Why do RawNoteData stores just the tag ids instead of storing the whole tag object array (id along with label)?

Consider a scenario where we add a functionality to update our tags. So our update tag
function takes in tag id and updated label value for that tag. Once we run this function
our tag gets updated in our tags array which we are keeping in local storage.

Now consider if we were storing Tag object inside RawNoteData this tag label updation needs to be reflected there too. A way to do this would be to go inside every note then process tags array of individual note and update the label values accordingly but this sounds tedious and repetitive to implement.

A better solution is to just store the tag ids inside RawNoteData. So when a tag get's
updated it results in re-rendering of our App component and on execution of App component we can extract notes array with actual tag labels along with their ids from
RawNoteData by finding updated label value correspondin to a tag id from updated Tag array this is possible because tag id remains the same only tag label can change.

So in a way tagIds in our note refer the Tags array for any kind of mutation in our tags info.

This would also make deletion of a tag much easier which is a mutation in our tags array.

In essence, the main idea is to maintain all tag related information at once place and provide a unique identifier to all other data pieces (RawNoteData in this case) so that they can refer to tag related information they require. Now whatever mutation we do our tags data will be reflected in other data pieces that are referring to tag info via the unique identifier we provided. So we have a single source of truth for our data inside for tags.
