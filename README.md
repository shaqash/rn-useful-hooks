# rn-useful-hooks
Useful hooks for React Native

## How to

### Build
```bash
git clone github.com/shaqash/rn-useful-hooks
cd rn-useful-hooks
npm install
tsc
```
### useAdvState
(initial) => [state, updateState, setState, clearState]

@param {Object} `state` State object  
@param {Function} `updateState` Acts like class-component setState  
@param {Function} `setState` Acts like useState: setState  
@param {Function} `clearState` Sets state to {}  

### useLoading
(initial = false: boolean) => [isLoading, load]

Hook for async functions, use isLoading to determine when an async function loads.
```javascript
const [isLoading, load] = useLoading(false);
// Loads at comp mount
useEffect(() => {
  load(callback)
}, [])

return (
  <Loader isLoading={isLoading} />
)
```
