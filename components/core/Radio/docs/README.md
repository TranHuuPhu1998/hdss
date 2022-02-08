<h3>Usage</h3>

```jsx

<Grid container>
  <Grid container spacing={4}>
    <Grid item xs={2}>
      <Radio checked />
    </Grid>
    <Grid item xs={2}>
      <Radio checked={false} />
    </Grid>
  </Grid>
  <Grid container spacing={4}>
    <Grid item xs={2}>
      <Radio checked>Checked</Radio>
    </Grid>
    <Grid item xs={2}>
      <Radio checked={false}>Unchecked</Radio>
    </Grid>
  </Grid>
</Grid>
```

<h4>Disabled</h4>

```jsx

<Grid container>
  <Grid container spacing={4}>
    <Grid item xs={2}>
      <Radio disabled checked />
    </Grid>
    <Grid item xs={2}>
      <Radio disabled checked={false} />
    </Grid>
  </Grid>
  <Grid container spacing={4}>
    <Grid item xs={2}>
      <Radio disabled checked>
        Checked
      </Radio>
    </Grid>
    <Grid item xs={2}>
      <Radio disabled checked={false}>
        Unchecked
      </Radio>
    </Grid>
  </Grid>
</Grid>
```
