import type {
  CallstackEntryStackTraceEntry,
  UnrecognizedCreateCallstackEntryStackTraceEntry,
  UnrecognizedContractCallstackEntryStackTraceEntry,
  PrecompileErrorStackTraceEntry,
  RevertErrorStackTraceEntry,
  PanicErrorStackTraceEntry,
  CustomErrorStackTraceEntry,
  FunctionNotPayableErrorStackTraceEntry,
  InvalidParamsErrorStackTraceEntry,
  FallbackNotPayableErrorStackTraceEntry,
  FallbackNotPayableAndNoReceiveErrorStackTraceEntry,
  UnrecognizedFunctionWithoutFallbackErrorStackTraceEntry,
  MissingFallbackOrReceiveErrorStackTraceEntry,
  ReturndataSizeErrorStackTraceEntry,
  NonContractAccountCalledErrorStackTraceEntry,
  CallFailedErrorStackTraceEntry,
  DirectLibraryCallErrorStackTraceEntry,
  UnrecognizedCreateErrorStackTraceEntry,
  UnrecognizedContractErrorStackTraceEntry,
  OtherExecutionErrorStackTraceEntry,
  UnmappedSolc063RevertErrorStackTraceEntry,
  ContractTooLargeErrorStackTraceEntry,
  InternalFunctionCallStackEntry,
  ContractCallRunOutOfGasError,
} from "@nomicfoundation/edr";

export {
  SourceReference,
  StackTraceEntryType,
  stackTraceEntryTypeToString,
  FALLBACK_FUNCTION_NAME,
  RECEIVE_FUNCTION_NAME,
  CONSTRUCTOR_FUNCTION_NAME,
  UNRECOGNIZED_FUNCTION_NAME,
  UNKNOWN_FUNCTION_NAME,
  PRECOMPILE_FUNCTION_NAME,
  UNRECOGNIZED_CONTRACT_NAME,
} from "@nomicfoundation/edr";

export type {
  CallstackEntryStackTraceEntry,
  UnrecognizedCreateCallstackEntryStackTraceEntry,
  UnrecognizedContractCallstackEntryStackTraceEntry,
  PrecompileErrorStackTraceEntry,
  RevertErrorStackTraceEntry,
  PanicErrorStackTraceEntry,
  CustomErrorStackTraceEntry,
  FunctionNotPayableErrorStackTraceEntry,
  InvalidParamsErrorStackTraceEntry,
  FallbackNotPayableErrorStackTraceEntry,
  FallbackNotPayableAndNoReceiveErrorStackTraceEntry,
  UnrecognizedFunctionWithoutFallbackErrorStackTraceEntry,
  MissingFallbackOrReceiveErrorStackTraceEntry,
  ReturndataSizeErrorStackTraceEntry,
  NonContractAccountCalledErrorStackTraceEntry,
  CallFailedErrorStackTraceEntry,
  DirectLibraryCallErrorStackTraceEntry,
  UnrecognizedCreateErrorStackTraceEntry,
  UnrecognizedContractErrorStackTraceEntry,
  OtherExecutionErrorStackTraceEntry,
  UnmappedSolc063RevertErrorStackTraceEntry,
  ContractTooLargeErrorStackTraceEntry,
  InternalFunctionCallStackEntry,
  ContractCallRunOutOfGasError,
};

export type SolidityStackTraceEntry =
  | CallstackEntryStackTraceEntry
  | UnrecognizedCreateCallstackEntryStackTraceEntry
  | UnrecognizedContractCallstackEntryStackTraceEntry
  | PrecompileErrorStackTraceEntry
  | RevertErrorStackTraceEntry
  | PanicErrorStackTraceEntry
  | CustomErrorStackTraceEntry
  | FunctionNotPayableErrorStackTraceEntry
  | InvalidParamsErrorStackTraceEntry
  | FallbackNotPayableErrorStackTraceEntry
  | FallbackNotPayableAndNoReceiveErrorStackTraceEntry
  | UnrecognizedFunctionWithoutFallbackErrorStackTraceEntry
  | MissingFallbackOrReceiveErrorStackTraceEntry
  | ReturndataSizeErrorStackTraceEntry
  | NonContractAccountCalledErrorStackTraceEntry
  | CallFailedErrorStackTraceEntry
  | DirectLibraryCallErrorStackTraceEntry
  | UnrecognizedCreateErrorStackTraceEntry
  | UnrecognizedContractErrorStackTraceEntry
  | OtherExecutionErrorStackTraceEntry
  | UnmappedSolc063RevertErrorStackTraceEntry
  | ContractTooLargeErrorStackTraceEntry
  | InternalFunctionCallStackEntry
  | ContractCallRunOutOfGasError;

export type SolidityStackTrace = SolidityStackTraceEntry[];
